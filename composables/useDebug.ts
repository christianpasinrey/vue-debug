let debugEventName = 'debug';

export const setDebugEventName = (name: string) => {
    debugEventName = name;
};

const useDebug = (data: any) => {
    window.dispatchEvent(new CustomEvent(debugEventName, {
        detail: {
            message: 'Debugging information',
            timestamp: Date.now(),
            data: data
        }
    }));
};

export default useDebug;