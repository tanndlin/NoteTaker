/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import { Configs, IConfigContext, defaultConfigs } from '../common/types';
import { objectMerge } from '../common/utils';

const ConfigContext = React.createContext<IConfigContext>({} as IConfigContext);

type Props = { children: React.ReactNode | React.ReactNode[] };

const ConfigProvider: FC<Props> = ({ children }) => {
    const [configs, setConfigs] = React.useState<Configs>(
        objectMerge(
            JSON.parse(
                localStorage.getItem('configs') ??
                    JSON.stringify(defaultConfigs)
            ),
            defaultConfigs
        )
    );

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
