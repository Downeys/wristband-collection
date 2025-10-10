import { getAllTracks } from '../server/actions/tracks';
import { RadioPage } from '../Radio/RadioPage';
import PlayListProvider from '../common/context/player/PlayerContextProvider';
import { Suspense } from 'react';
import styles from './HomePage.module.scss';

const preloadTracks = () => {
  void getAllTracks();
};

export default async function HomePage() {
  preloadTracks();
  const tracks = await getAllTracks();
  return (
    <main className={styles.mainContainer}>
      <Suspense>
        <PlayListProvider props={{ playList: tracks, mode: 'random' }}>
          <RadioPage />
        </PlayListProvider>
      </Suspense>
    </main>
  );
}
