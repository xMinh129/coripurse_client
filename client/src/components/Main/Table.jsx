import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export const TableList = () => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn>Item</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Price / $</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>Wissebeerger Water Bottle</TableRowColumn>
                <TableRowColumn>10.40</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Bloomberg Magazine</TableRowColumn>
                <TableRowColumn>20.50</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Samsung Original Earphone</TableRowColumn>
                <TableRowColumn>10.90</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>GoPro Camera Accessory Kit</TableRowColumn>
                <TableRowColumn>32.10</TableRowColumn>
            </TableRow>
            <TableRow>
                <TableRowColumn>5</TableRowColumn>
                <TableRowColumn>Echo Dot (2nd Generation) - Smart speaker - Black</TableRowColumn>
                <TableRowColumn>13.30</TableRowColumn>
            </TableRow>
        </TableBody>
    </Table>
);

export const SumRow = () => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableRowColumn>Total Amount</TableRowColumn>
                    <TableRowColumn></TableRowColumn>
                    <TableRowColumn>$87.20</TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
}

