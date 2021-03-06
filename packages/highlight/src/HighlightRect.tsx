/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2020 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import React, { FC } from 'react';

import { getCssProperties } from './transformArea';
import HighlightArea from './types/HighlightArea';

interface HighlightRectProps {
    area: HighlightArea;
    rotation: number;
}

const HighlightRect: FC<HighlightRectProps> = ({ area, rotation }) => (
    <div
        className='rpv-highlight-rect'
        style={getCssProperties(area, rotation)}
    />
);

export default HighlightRect;
