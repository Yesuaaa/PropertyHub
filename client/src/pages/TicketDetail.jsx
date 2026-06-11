import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tickets/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!ticket) {
    return <p className="text-center mt-10 text-gray-500">Ticket not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Link to="/dashboard" className="text-indigo-600 hover:underline text-sm">
        &larr; Back to tickets
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Ticket #{ticket.id}</h2>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              ticket.status === 'Open'
                ? 'bg-green-100 text-green-700'
                : ticket.status === 'In Progress'
                ? 'bg-yellow-100 text-yellow-700'
                : ticket.status === 'Resolved'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {ticket.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Type:</span> {ticket.type}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {ticket.category}
          </div>
          <div>
            <span className="font-semibold">Priority:</span> {ticket.priority}
          </div>
          <div>
            <span className="font-semibold">Created:</span>{' '}
            {new Date(ticket.created_at).toLocaleString()}
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{ticket.description}</p>
        </div>
      </div>
    </div>
  );
}
