/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Configs, IConfigContext, defaultConfigs } from '../common/types';
import { objectMerge } from '../common/utils';

const ConfigContext = React.createContext<IConfigContext>({} as IConfigContext);

type Props = { children: React.ReactNode | React.ReactNode[] };

const ConfigProvider = (props: Props) => {
    const { children } = props;
    const [configs, setConfigs] = React.useState<Configs>(
        objectMerge(
            JSON.parse(
                localStorage.getItem('configs') ??
                    JSON.stringify(defaultConfigs)
            ),
            defaultConfigs
        )
    );

    console.log(configs);

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
