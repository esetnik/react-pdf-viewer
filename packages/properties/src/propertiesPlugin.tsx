/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React, { ReactElement, useMemo } from 'react';
import { createStore, Plugin, PluginOnDocumentLoad, ViewerState } from '@react-pdf-viewer/core';

import ShowProperties, { ShowPropertiesProps } from './ShowProperties';
import ShowPropertiesMenuItem from './ShowPropertiesMenuItem';
import StoreProps from './StoreProps';

export interface ShowPropertiesMenuItemProps {
    onClick: () => void;
}

interface PropertiesPlugin extends Plugin {
    ShowProperties(props: ShowPropertiesProps): ReactElement;
    ShowPropertiesButton(): ReactElement;
    ShowPropertiesMenuItem(props: ShowPropertiesMenuItemProps): ReactElement;
}

const propertiesPlugin = (): PropertiesPlugin => {
    const store = useMemo(() => createStore<StoreProps>({
        fileName: '',
    }), []);

    const ShowPropertiesDecorator = (props: ShowPropertiesProps) => (
        <ShowProperties {...props} store={store} />
    );

    const ShowPropertiesButtonDecorator = () => (
        <ShowProperties store={store} />
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ShowPropertiesMenuItemDecorator = (props: ShowPropertiesMenuItemProps) => (
        <ShowPropertiesDecorator>
            {(p) => <ShowPropertiesMenuItem {...p} />}
        </ShowPropertiesDecorator>
    );

    return {
        onDocumentLoad: (props: PluginOnDocumentLoad) => {
            store.update('doc', props.doc);
        },
        onViewerStateChange: (viewerState: ViewerState): ViewerState => {
            store.update('fileName', viewerState.file.name);
            return viewerState;
        },
        ShowProperties: ShowPropertiesDecorator,
        ShowPropertiesButton: ShowPropertiesButtonDecorator,
        ShowPropertiesMenuItem: ShowPropertiesMenuItemDecorator,
    };
};

export default propertiesPlugin;
