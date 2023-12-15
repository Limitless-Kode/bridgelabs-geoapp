import {ComposableMap, Geographies, Geography} from "react-simple-maps";

type InteractiveMapProps = {
    selectedCountry: any;
    onMapSelect: (name: string) => void;
}
const InteractiveMap = ({onMapSelect, selectedCountry}: InteractiveMapProps) => {
    return (
        <div className="w-[95vw] md:w-[80vw]">
            <ComposableMap>
                <Geographies geography="/features.json">
                    {({geographies}) =>
                        geographies.map((geo: any) => (
                            <Geography
                                className="cursor-pointer"
                                onClick={() => onMapSelect(geo.properties.name)}
                                key={geo.rsmKey}
                                geography={geo}
                                fill="#F2F2F2"
                                stroke="#CCC"
                                style={{
                                    default: {
                                        fill: selectedCountry?.name === geo.properties.name ? "#EA580D" : "#F2F2F2",
                                        outline: 'none'
                                    },
                                    hover: {
                                        fill: "#EA580D",
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: "#C530CC",
                                        outline: "none",
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
}

export default InteractiveMap;