import React, { FC, } from "react";

export type FCHyperscript<Props = {}> = FC<Props> & { hyperscript: string }
type CardProps = {
    value: string
}
export const Card: FCHyperscript<CardProps> = ({ value }) =>
    <div className="card liftable"
        style={{ touchAction: "none" }}
        data-script={Card.hyperscript}
    >
        <div className="card__body">
            <div className="value">{value}</div>
        </div>
    </div>

Card.hyperscript =
    `
init
  trigger resetdrag on me
end

on resetdrag
  me.style.setProperty('--drag-dx', 0 px)
  me.style.setProperty('--drag-dy', 0 px)
end

-- Adapted from "drag" example at https://hyperscript.org/playground/
on pointerdown(clientX, clientY)
  halt the event

  set pointStartX to clientX
  set pointStartY to clientY

  set dragStartX to parseInt(me.style.getPropertyValue('--drag-dx'), 10)
  set dragStartY to parseInt(me.style.getPropertyValue('--drag-dy'), 10)
  measure my x, y
  set cardOrigin to {
    x: x - dragStartX,
    y: y - dragStartY
  }

  add .lifted to me
  repeat until event pointerup from document
    wait for pointermove(clientX, clientY) or
             pointerup(clientX, clientY) or
             contextmenu from document -- With contextmenu I want to solve this issue that if you right click and then move the pointer off the screen, the statefulness of this loop is broken, because this loop depends on one of these events ALWAYS ending this flow, but the user can make this loop never end
    get clientX - pointStartX -- Offset of pointer on X axis since beginning
    get dragStartX + the result -- Map that offset to offset the starting drag position
    me.style.setProperty('--drag-dx', the result px)

    -- Replicate above process for Y
    get clientY - pointStartY
    get dragStartY + the result
    me.style.setProperty('--drag-dy', the result px)
    js(clientX, clientY)
        -- Because the card is below the pointer, basic hover in ineffective
        -- So ask DOM what elements are beneath pointer
        return document.elementsFromPoint(clientX, clientY)
        .filter((elt) => elt.classList.contains('target'))
    end

    set active to the result

    -- Also removes those targets not in active
    add .target--active to <.target /> when it is in active
  end
  send dropCard(card: me, cardOrigin: cardOrigin) to active
  remove .lifted from me
`

export const DropTarget: FCHyperscript = () =>
    <div className="target border-4 border-black" data-script={DropTarget.hyperscript}>
        <div className="target__body">Drag target</div>
    </div>

DropTarget.hyperscript =
    `
on dropCard(card, cardOrigin)
  -- If the card isn't in me yet
  get closest parent <.target /> to card
  if the result is not me
    -- Auto drag it to me
    set body to first of .target__body in me
    measure element body x, y
    get x - cardOrigin.x
    card.style.setProperty('--drag-dx', the result px)
    get y - cardOrigin.y
    card.style.setProperty('--drag-dy', the result px)
      -- Wait for every transition to end until the one we want
    repeat forever
      wait for transitionend from card
      if result.propertyName is 'transform'
          put '' into body's innerHTML
          body.appendChild(card)
        break
      end
    end
  end
  -- Now the card is definitely in target
  card.style.setProperty('--drag-dx', 0 px)
  card.style.setProperty('--drag-dy', 0 px)
`
