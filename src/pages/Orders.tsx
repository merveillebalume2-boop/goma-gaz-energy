import { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import { HiCube, HiTruck, HiCheckCircle, HiLocationMarker } from 'react-icons/hi';
import { API_BASE_URL } from '../config';

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

      {/* Carte Goma */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full glass rounded-[3rem] overflow-hidden relative border border-white/10 p-2 shadow-2xl">
        {selectedOrder ? (
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-900 relative">
            {/* Placeholder Map in case API Key is missing - real API Key required for PROD */}
            <APIProvider apiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <Map
                defaultZoom={14}
                defaultCenter={{ lat: selectedOrder.lat, lng: selectedOrder.lng }}
                mapId="DEMO_MAP_ID"
                disableDefaultUI={true}
                className="w-full h-full"
              >
                <Marker position={{ lat: selectedOrder.lat, lng: selectedOrder.lng }} />
                
                {/* Simuler position hub vers domicile */}
                {selectedOrder.status === 'En route' && (
                  <Marker 
                    position={{ lat: selectedOrder.lat + 0.005, lng: selectedOrder.lng - 0.005 }} 
                    icon={{
                        url: 'data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3000/svg"><path d="M5 14L5 19C5 20.1046 5.89543 21 7 21L17 21C18.1046 21 19 20.1046 19 19L19 14M5 14L19 14M5 14L9 7H15L19 14" stroke="%233b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="18" r="1" fill="%233b82f6"/><circle cx="16" cy="18" r="1" fill="%233b82f6"/></svg>'
                    }}
                  />
                )}
              </Map>
            </APIProvider>
            
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-[2rem] glass border border-white/10 backdrop-blur-xl flex items-center justify-between z-10">
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
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Statut Livreur</div>
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
