import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getReceivedChallenges, updateChallengeStatus, Challenge } from '@/lib/challenge-api';
import { Button } from '@/components/ui/button';

export default function DirectChallenge() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [received, setReceived] = useState<Challenge[]>([]);

  async function handleCheckReceived() {
    if (!user) return;
    setLoading(true);
    const res = await getReceivedChallenges(user.code);
    setReceived(res.challenges || []);
    setLoading(false);
  }

  async function handleAction(id: string, action: 'accept' | 'reject') {
    setLoading(true);
    await updateChallengeStatus(id, action);
    await handleCheckReceived();
    setLoading(false);
  }

  // Cargar retos al montar
  useEffect(() => {
    handleCheckReceived();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className='space-y-8'>
      <div>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xl font-bold'>Retos recibidos</h2>
          <Button
            variant='secondary'
            onClick={handleCheckReceived}
            disabled={loading}
          >
            Actualizar
          </Button>
        </div>
        {received.length === 0 ? (
          <div className='text-sm text-gray-500'>
            No tienes retos recibidos.
          </div>
        ) : (
          <ul className='space-y-2'>
            {received.map((c) => (
              <li key={c.id} className='border rounded p-2'>
                <div>
                  <b>De:</b> {c.fromUser}
                </div>
                <div>
                  <b>Monto:</b> {c.amount}
                </div>
                <div>
                  <b>Mensaje:</b> {c.message}
                </div>
                <div>
                  <b>Estado:</b> {c.status}
                </div>
                {c.status === 'pending' && (
                  <div className='flex gap-2 mt-2'>
                     <Button
                       size='sm'
                       variant='default'
                       onClick={() => handleAction(c.id, 'accept')}
                       disabled={loading}
                     >
                       Aceptar
                     </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleAction(c.id, 'reject')}
                      disabled={loading}
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
