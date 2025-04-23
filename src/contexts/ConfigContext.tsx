/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Configs, IConfigContext, defaultConfigs } from '../common/types';

const ConfigContext = React.createContext<IConfigContext>({} as IConfigContext);

type Props = { children: React.ReactNode | React.ReactNode[] };

const ConfigProvider = (props: Props) => {
    const { children } = props;
    const [configs, setConfigs] = React.useState<Configs>({
        ...defaultConfigs,
        ...JSON.parse(
            localStorage.getItem('configs') ?? JSON.stringify(defaultConfigs)
        )
    });
    React.useEffect(() => {
        localStorage.setItem('configs', JSON.stringify(configs));
    }, [configs]);

    const temp: IConfigContext = {
        configs,
        setConfigs
    };

    return (
        <ConfigContext.Provider value={temp}>{children}</ConfigContext.Provider>
    );
};

export { ConfigContext, ConfigProvider };
