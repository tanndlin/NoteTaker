declare module '*.md';

declare module 'react-graph-vis' {
    import { ComponentType } from 'react';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Graph: ComponentType<any>;
    export default Graph;
}
