import * as React from "react";

import Resistance from "../../misc/Resistance";
import { ResistanceProps } from "../../misc/interfaces";
import {
  OhmValueCalculator,
  OhmValueCalculatorService
} from "../../misc/OhmValueCalculator";

import "./styles.scss";

// the calculator service
const service: OhmValueCalculator = new OhmValueCalculatorService();

/**
 * Calculates the final resistance.
 * @param {ResistanceProps} props the props of the resistance.
 * @returns {React.ReactElement} the resistance component.
 */
export default function ResistanceResult(
  props: ResistanceProps
): React.ReactElement<ResistanceProps> {
  const result: Resistance = service.CalculateOhmValue(
    props.a,
    props.b,
    props.multiplier,
    props.tolerance
  );

  return (
    <div className="results">
      <h2>{result.toResistance(true)}</h2>
    </div>
  );
}
