export const LogoSVG: React.FC<{ className?: string }> = ({ className = '' }) =>
    <svg className={`cpnt-logo ${className}`}>
        <use
            xlinkHref="#symLogo"
            x="0"
            y="0" />
    </svg>

export const LogoSVGSymbol: React.FC = () =>
    <svg
        className="hidden"
        // React JSX doesn't like the ":", so pass it literally
        {...{ "xmlns:svg": "http://www.w3.org/2000/svg" }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="32"
        height="32">
        <symbol id="symLogo" viewBox="0 0 32 32">
            <g>
                <g transform="translate(-0.06806793,-0.06858534)">
                    <g transform="translate(-1.0833332,0.64874049)">
                        <path
                            d="m 17.151401,1.2352327 c -7.8313964,0 -14.1983698,6.339457 -14.1983698,14.1708533 0,7.831397 6.3669734,14.198371 14.1983698,14.198371 7.831397,0 14.19837,-6.366974 14.19837,-14.198371 0,-7.8313963 -6.366973,-14.1708533 -14.19837,-14.1708533 z m 0,0.9080353 c 7.334485,0 13.262819,5.9283344 13.262819,13.262818 0,7.334484 -5.928334,13.290336 -13.262819,13.290336 -7.3344838,0 -13.2628183,-5.955852 -13.2628183,-13.290336 0,-7.3344836 5.9283345,-13.262818 13.2628183,-13.262818 z" />
                        <path
                            d="m 13.334885,28.322261 c 1.049976,0.635512 0.813218,0.640253 2.084242,0.502099 0,0 7e-6,-6.11225 0.05526,-10.042771 0.05525,-3.93052 2.413483,-6.274778 6.948442,-7.694814 3.055071,-0.956636 3.267743,-1.9168298 1.598667,-1.9168298 -5.408328,0 -8.566885,3.6979468 -8.566885,3.6979468 0,0 0.552801,-1.608397 -0.12393,-2.583228 C 13.31872,7.3864336 13.50293,11.20716 13.47304,12.836193 l -0.110524,6.023548 c -0.0703,3.83139 -0.02763,9.46252 -0.02763,9.46252 z"
                        />
                    </g>
                </g>
            </g>
        </symbol>
    </svg>
