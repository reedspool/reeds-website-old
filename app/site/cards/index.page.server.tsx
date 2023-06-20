import React, { FC, ReactElement } from "react";
import { Card, DropTarget, FCHyperscript } from ".";
import { Map } from "../renderer/components/Map";

const constants: Array<ReactElement> = [];

constants.push(<h1>Cards Experiment</h1>);

const PlayingCardShort = ["A", "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "J", "Q", "K"];
const PlayingCardValues: Record<typeof PlayingCardShort[number], number> = {
    A: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7,
    8: 8, 9: 9, 10: 10, J: 11, Q: 12, K: 13,
}
const PlayingCardTitles: Record<typeof PlayingCardShort[number], string> = {
    A: "Ace", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
    6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
    J: "Jack", Q: "Queen", K: "King",
}

export const ResetButton: FCHyperscript = () =>
    <button data-script={ResetButton.hyperscript}>reset drag</button>

ResetButton.hyperscript = `on click send resetdrag to <.card /> `
constants.push(<ResetButton />)


for (let value of PlayingCardShort) constants.push(<Card value={value} />)
for (let i = 1; i <= 10; i++) constants.push(<DropTarget />)

export const Page: React.FC = () =>
    <div className="flex flex-row flex-wrap gap-4 relative">
        <Map From={constants} />
    </div>
