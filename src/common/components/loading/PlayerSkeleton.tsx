    import React from 'react';

    const GrayLine: React.FC = () => <div className="h-4 bg-gray-300 rounded" />;
    const GrayCircle: React.FC = () => <div className='h-10 w-10 bg-gray-300 rounded rounded-full' />;
    const GrayCircleLg: React.FC = () => <div className='h-20 w-20 bg-gray-300 rounded rounded-full' />;

    const PlayerSkeleton: React.FC = () => {
      return (
        <div className="h-56 w-screen shadow-footer rounded-md p-4 mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1 px-4">
              <GrayLine />
              <div className="space-y-3" />
              <GrayLine />
              <div className='flex justify-evenly items-center space-y-3'>
                <GrayCircle />
                <GrayCircleLg />
                <GrayCircle />
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default PlayerSkeleton;