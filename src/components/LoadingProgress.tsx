interface LoadingProgressProps {
    title?: string;
    progress: number | null;
}

export const LoadingProgress = ({ title, progress }: LoadingProgressProps) => (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
        <div className="custom-spinner" />
        {title && <p className="text-primary italic text-md">Scraping in progress...</p>}
        {progress !== null && (
            <div className="mt-6 w-64 bg-white-opacity-50 rounded-full h-2 overflow-hidden shadow-inner">
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
