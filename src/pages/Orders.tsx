import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { HiCube, HiTruck, HiCheckCircle, HiLocationMarker } from 'react-icons/hi';
import { API_BASE_URL } from '../config';

// Fix pour les icônes Leaflet par défaut
const defaultIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
});

// Composant pour déplacer la vue de la carte
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

// Composant pour afficher la géolocalisation de l'utilisateur
function UserLocationMarker() {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const map = useMap();
  
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        // On ne recentre pas sur l'utilisateur pour garder le focus sur la commande
      });
    }, [map]);
  
    return position === null ? null : (
      <>
        <Circle 
            center={position} 
            radius={100} 
            pathOptions={{ fillColor: '#3b82f6', color: '#3b82f6', fillOpacity: 0.2, weight: 1 }} 
        />
        <Marker 
            position={position} 
            icon={L.divIcon({
                className: 'user-location-marker',
                html: '<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #3b82f6;"></div>',
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            })} 
        />
      </>
    );
}

interface Order {
  id: number;
  customerName: string;
  phone: string;
  total: number;
  status: 'En attente' | 'En route' | 'Livré';
  lat: number;
  lng: number;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/orders`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        if (data.length > 0) setSelectedOrder(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livré': return <HiCheckCircle className="text-green-500" size={20} />;
      case 'En route': return <HiTruck className="text-blue-500" size={20} />;
      default: return <HiCube className="text-orange-500" size={20} />;
    }
  };

  return (
    <div className="space-y-8 flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      {/* Liste des Commandes */}
      <div className="w-full lg:w-1/3 flex flex-col space-y-6 overflow-hidden">
        <h1 className="text-4xl font-black shrink-0">Suivi</h1>
        <div className="overflow-y-auto space-y-4 pr-2 flex-1">
          {loading ? (
            <div className="text-slate-400">Chargement des commandes...</div>
          ) : orders.length === 0 ? (
            <div className="glass p-8 text-center rounded-[3rem] text-slate-400">
              Aucune commande trouvée. Allez à la boutique pour commander.
            </div>
          ) : (
            orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedOrder(order)}
                className={`glass p-6 rounded-[2rem] cursor-pointer transition-all ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-orange-500 bg-orange-500/5' : 'hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">Ordre #{order.id}</span>
                    <h3 className="font-bold text-lg">{order.customerName}</h3>
                  </div>
                  <div className="text-lg font-black text-orange-400">${order.total.toFixed(2)}</div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-full border border-white/5">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <span className="font-semibold flex-1 font-sm">{order.status}</span>
                  <span className="text-xs text-slate-500 pr-3">
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Carte Goma (Leaflet - GRATUIT) */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full glass rounded-[3rem] overflow-hidden relative border border-white/10 p-2 shadow-2xl">
        {selectedOrder ? (
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-[#0d1b2a] relative">
            <MapContainer
              center={[selectedOrder.lat, selectedOrder.lng]}
              zoom={15}
              scrollWheelZoom={true}
              attributionControl={false}
              className="w-full h-full z-0"
              style={{ background: '#0d1b2a' }}
            >
              <ChangeView center={[selectedOrder.lat, selectedOrder.lng]} />
              
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* Position du client / Gaz */}
              <Marker position={[selectedOrder.lat, selectedOrder.lng]} icon={defaultIcon} />
              
              {/* Votre position actuelle */}
              <UserLocationMarker />
              
            </MapContainer>
            
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-[2rem] glass border border-white/10 backdrop-blur-xl flex items-center justify-between z-[1000]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-[1.5rem] bg-orange-500/20 text-orange-500 flex items-center justify-center">
                  <HiLocationMarker size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 capitalize">Destination</div>
                  <div className="text-lg font-black text-white">{selectedOrder.customerName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-400 font-sm uppercase tracking-wider">Statut Livreur</div>
                <div className={`text-xl font-black ${selectedOrder.status === 'Livré' ? 'text-green-400' : selectedOrder.status === 'En route' ? 'text-blue-400' : 'text-orange-400'}`}>
                    {selectedOrder.status}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
            <HiLocationMarker size={48} className="opacity-20" />
            <p>Sélectionnez une commande pour la tracer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
