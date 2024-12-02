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
        console.log('Nueva insignia desbloqueada:', payload.new.Insignia_ID);
        // Llamamos la función de desbloqueo
        onBadgeUnlock(payload.new.Insignia_ID);
      }
    )
    .subscribe();

  // Devuelve una función para cancelar la suscripción si es necesario
  return () => {
    channel.unsubscribe();
  };
};
