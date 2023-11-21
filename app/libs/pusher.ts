import Pusher from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.PUSHER_CLUSTER as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  useTLS: true
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  {
    cluster: process.env.PUSHER_CLUSTER as string,
    channelAuthorization: {
      endpoint: '/api/pusher/auth',
      transport: 'ajax'
    }
  }
);
