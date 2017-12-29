import * as React from "react";

import { Resistance, ResistanceProps } from "../../misc/interfaces";
import {
  OhmValueCalculator,
  OhmValueCalculatorService
} from "../../misc/OhmValueCalculator";

import "./ResistanceResults.scss";

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

  let formatted: string;
  if (result.value / 1000000 > 1) {
    formatted = `${(result.value / 1000000).toString()}M`;
  } else if (result.value / 1000 > 1) {
    formatted = `${(result.value / 1000).toString()}K`;
  } else {
    formatted = `${result.value}`;
  }

  return (
    <div className="results">
      <h2>{`${formatted}Ω ±${result.tolerance}%`}</h2>
    </div>
  );
}
