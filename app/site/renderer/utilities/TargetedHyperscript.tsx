import { FC } from "react";

export const hsInstallTargetedHyperscript =
    `
  init
    for script in <script[type=targeted-hyperscript] />
      -- Eval the hyperscript expression in the attribute to find the target
      call _hyperscript(script's @executeon, { me: script })
      set target to the result

      -- Put the script in the normal hyperscript attribute and initialize it
      put script's innerText into target's @data-script
      call _hyperscript.processNode(target)
    end
`;

export const InstallTargetedHyperscript: FC = () =>
    <script
        type="text/hyperscript"
        dangerouslySetInnerHTML={{ __html: hsInstallTargetedHyperscript }}
    />

export type TargetedHyperscriptProps = {
    on: string;
    script: string;
}
export const TargetedHyperscript
    : FC<TargetedHyperscriptProps>
    = ({ on, script }) =>
        <script
            type="targeted-hyperscript"
            //@ts-ignore How to tell TypeScript about our custom attribute?
            executeon={on}
            dangerouslySetInnerHTML={{ __html: script }}
        />
