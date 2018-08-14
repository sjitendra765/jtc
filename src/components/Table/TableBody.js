// @flow

import React from 'react';
import {TableBody} from 'material-ui';

type Props = {
  data: Array<any>,
  render: (datum: any, index: number) => ReactNode,
};

export default function TableBodyComponent(props: Props) {
  let {data, render, ...otherProps} = props;

  return (
    <TableBody {...otherProps}>
      {data.map((datum, index) => {
        return render(datum, index);
      })}
    </TableBody>
  );
}
