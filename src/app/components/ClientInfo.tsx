// components/ClientInfo.tsx
import React from 'react';

interface ClientInfoProps {
  clientHeading: string;
  client: string;
  time: string;
  date: string;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ clientHeading, client, time, date }) => (
  <div className="flex flex-col space-y-1 items-center mb-4 md:mb-6">
    <h3 className="text-xs md:text-sm lg:text-base text-gray-500 uppercase tracking-wide mb-2">
      {clientHeading}
    </h3>
    <p className="text-xs md:text-sm lg:text-base">{client}</p>
    <p className="text-xs md:text-sm lg:text-base">{time}</p>
    <p className="text-xs md:text-sm lg:text-base">{date}</p>
  </div>
);

export default ClientInfo;
