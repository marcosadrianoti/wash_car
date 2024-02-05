'use client'

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Schedule() {
  const { user } = useUser();
    return (
      <div>
        <span>{user?.name} entrou.</span>
      </div>
    );
  }
  