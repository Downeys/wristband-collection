import mongoose from 'mongoose';
import asyncConfig from '@/common/config/config';

// const NAMESPACE = 'mongo-repo';

interface ConnectionProps {
  isConnected: boolean;
}

const connection: ConnectionProps = { isConnected: false };

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      // globalThis.logger?.info({
      //   meta: { namespace: NAMESPACE },
      //   message: 'Using existing db connection.',
      // });
      return;
    }
    const config = await asyncConfig;
    const db = await mongoose.connect(config.mongoDb.uri);
    connection.isConnected = !!db.connections[0]?.readyState;
  } catch (error: any) {
    globalThis.logger?.error({
      err: error,
      message: 'Failed to connect to db.',
    });
    throw new Error(error);
  }
};
