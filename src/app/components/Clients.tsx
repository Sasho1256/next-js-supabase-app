import { supabase } from '@/lib/supabaseClient';
import * as React from 'react';
import { useState } from 'react';
import { Client } from '../types/Client';

export interface IClientsProps {
}

export function Clients(props: IClientsProps) {
    const [clients, setClients] = useState<Client[]>([]);

    React.useEffect(() => {
        const fetchClients = async () => {
            const { data, error } = await supabase.from<'clients', Client[]>('clients').select('*');
            if (error) {
                console.log('Error fetching clients:', error);
            } else {
                setClients(data as Client[]);
            }

        };

        fetchClients();
    }, []);

    return (
        <>
            <br />
            <h1>Supabase Clients</h1>
            <br />
            <div className='flex justify-center overflow-x-auto'>
                <table className='max-w-full bg-white border border-gray-200 rounded-lg shadow-md '>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold border-b">Email</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold border-b">Name</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold border-b">Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client: Client) => (
                            <>
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="text-left py-2 px-4 border-b">{client.email}</td>
                                    <td className="text-left py-2 px-4 border-b">{client.name}</td>
                                    <td className="text-left py-2 px-4 border-b">{client.is_active ? 'true' : 'false'}</td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <div>Count: {clients.length}</div>
            <br />
        </>
    );

}
