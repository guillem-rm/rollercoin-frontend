interface LoadingProgressProps {
    progress: number | null;
}

export const LoadingProgress = ({ progress }: LoadingProgressProps) => (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="custom-spinner" />
        <p className="text-white-opacity-50 text-md">Scraping in progress...</p>
        {progress !== null && (
            <div className="w-64 bg-white-opacity-50 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                    className="bg-primary-blue h-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        )}
        {progress !== null && (
            <p className="text-white-opacity-50 text-sm font-mono">{progress}%</p>
        )}
    </div>
);
