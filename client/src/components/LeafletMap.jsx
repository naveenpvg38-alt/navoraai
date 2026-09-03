import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function LeafletMap({ items = [] }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Filter items with valid coordinates
    const validItems = items.filter(
      (it) => typeof it.latitude === 'number' && typeof it.longitude === 'number'
    );

    if (validItems.length === 0) return;

    const initialLat = validItems[0].latitude;
    const initialLng = validItems[0].longitude;

    // Clean up existing map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 13,
      zoomControl: true,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add high-contrast voyager tiles suitable for dark UI
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    const latLngs = [];

    // Add custom numbered markers for each itinerary stop
    validItems.forEach((item, index) => {
      const latLng = [item.latitude, item.longitude];
      latLngs.push(latLng);

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: 34px; 
            height: 34px; 
            background: linear-gradient(135deg, #06B6D4, #4F46E5); 
            color: #FFFFFF; 
            border: 2px solid #FFFFFF; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: 800; 
            font-size: 13px; 
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.5);
            transform: translate(-17px, -17px);
          ">
            ${index + 1}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const popupContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 4px;">
          <div style="font-size: 10px; text-transform: uppercase; color: #06B6D4; font-weight: 700; margin-bottom: 2px;">
            Stop ${index + 1} • ${item.category || 'Destination'}
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #F8FAFC; margin-bottom: 4px;">
            ${item.place_name}
          </div>
          <div style="font-size: 11px; color: #94A3B8; margin-bottom: 6px; line-height: 1.4;">
            ${item.activity || ''}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: #E2E8F0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">
            <span>${item.start_time || ''} - ${item.end_time || ''}</span>
            <span style="color: #10B981;">${item.estimated_cost || ''}</span>
          </div>
        </div>
      `;

      L.marker(latLng, { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);
    });

    // Draw connected route polyline
    if (latLngs.length > 1) {
      L.polyline(latLngs, {
        color: '#06B6D4',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(map);

      // Fit bounds so all stops are displayed comfortably
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [items]);

  return (
    <div className="w-full h-full min-h-[350px] relative rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full min-h-[350px]" />
    </div>
  );
}
