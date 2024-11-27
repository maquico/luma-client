import { supabase } from './supabaseClient.js';

// Función para suscribirse al canal y manejar las inserciones
export const badgeChannel = (userId, onBadgeUnlock) => {
  // Iniciamos el canal
  const channel = supabase
    .channel('obtained_badge')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'Insignia_Conseguida',
        filter: `Usuario_ID=eq.${userId}`,
      },
      (payload) => {
        // Extraemos los datos del payload
        const badgeData = {
          badgeTitle: payload.new.title,
          description: payload.new.description,
          icon: payload.new.icon,
        };
        // Llamamos la función de desbloqueo
        onBadgeUnlock(badgeData);
      }
    )
    .subscribe();

  // Devuelve una función para cancelar la suscripción si es necesario
  return () => {
    channel.unsubscribe();
  };
};
