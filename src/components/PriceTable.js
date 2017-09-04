import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

export class PriceTable extends React.Component {
    // Table data as a list of array.
    static rows = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    // .... and more
    ];

    // Render your table
    render() {
        return (
            <div className="Price-Table">
                <Table
                    rowHeight={50}
                    rowsCount={PriceTable.rows.length}
                    width={500}
                    height={500}
                    headerHeight={50}>
                    <Column
                        header={<Cell>Col 1</Cell>}
                        cell={<Cell>Column 1 static content</Cell>}
                        width={200}
                    />
                    <Column
                        header={<Cell>Col 2</Cell>}
                        cell={<Cell>Column 2 content yo wuddup?</Cell>}
                        width={100}
                    />
                    <Column
                    header={<Cell>Col 3</Cell>}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                        Data for column 3: {PriceTable.rows[rowIndex][2]}
                        </Cell>
                    )}
                    width={200}
                    />
                </Table>
            </div>
        )
    }
}

export default PriceTable;