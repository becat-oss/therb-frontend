import { Program, ProgramParams, SpaceTypeParams, EnvelopeParams,OpaqueSetting } from "../types"

type Condition = {
  [index in Program]: any
}

export const condition: Condition = {
  office: {
    office_open: {
      envelope: 'concrete',
      base_wwr: 40,
    S: 26,
      heatingSetpt: 20,
      hvac: 'VRF::VRF',
      ef_ach: 0,
      ef_deltapressure: 0,
    },
    office_closed: {
      envelope: 'concrete',
      base_wwr: 40,
    S: 26,
      heatingSetpt: 20,
      hvac: 'VRF::VRF',
      ef_ach: 0,
      ef_deltapressure: 0,
    },
  },
  residential: {
    living: {
      envelope: 'concrete',
      base_wwr: 40,
    S: 26,
      heatingSetpt: 20,
      hvac: 'VRF::VRF',
      ef_ach: 0,
      ef_deltapressure: 0,
    },
  },
  retail: {
    sales: {
      envelope: 'concrete',
      base_wwr: 40,
    S: 26,
      heatingSetpt: 20,
      hvac: 'VRF::VRF',
      ef_ach: 0,
      ef_deltapressure: 0,
    },
  },
}

export const spaceTypeParams:SpaceTypeParams ={
  experiment: {
    coolingSetpt: 50,
    heatingSetpt: 10,
    pplDensity: 0,
    oaPerson: 0,
    oaArea: 0,
    smallPower: 0,
    lighting: 215,
    hvac: 'None::None',
    coolingCop: 3,
    heatingCop: 3,
  },
  office_closed: {
    coolingSetpt: 26,
    heatingSetpt: 22,
    pplDensity: 0.15,
    oaPerson: 2.5,
    oaArea: 0.3,
    smallPower: 15,
    lighting: 12,
    hvac: 'VRF::VRF',
    coolingCop: 3,
    heatingCop: 3,
  },
  office_open: {
    coolingSetpt: 26,
    heatingSetpt: 22,
    pplDensity: 0.1,
    oaPerson: 2.5,
    oaArea: 0.3,
    smallPower: 10,
    lighting: 10,
    hvac: 'VRF::VRF',
    coolingCop: 3,
    heatingCop: 3,
  },
}

export const programParams: ProgramParams = {
  office: {
    occupancy: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
    },
    hvac: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
    },
    lighting: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
    },
    equipment: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
    },
  },
  retail: {
    occupancy: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
    },
    hvac: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
    },
    lighting: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
    },
    equipment: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0, 0, 0, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 0.1, 0.2, 0.95, 0.95, 0.95, 0.95, 0.5, 0.95, 0.95, 0.95, 0.95, 0.3, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05],
      },
    },
  },
  residential: {
    occupancy: {
      weekday: {
        schedule: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.7, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.5, 0.5, 0.7, 0.7, 0.8, 0.9, 0.9],
      },
      saturday: {
        schedule: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.7, 0.5, 0.5, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7],
      },
      sunday: {
        schedule: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.5, 0.5, 0.5, 0.3, 0.3, 0.2, 0.2, 0.2, 0.3, 0.4, 0.4, 0.6, 0.6, 0.8, 0.8, 0.8],
      },
      coolingday: {
        schedule: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.7, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.5, 0.5, 0.7, 0.7, 0.8, 0.9, 0.9],
      },
      heatingday: {
        schedule: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.7, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.5, 0.5, 0.5, 0.7, 0.7, 0.8, 0.9, 0.9],
      },
    },
    hvac: {
      weekday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      },
      saturday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      },
      sunday: {
        schedule: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      },
      coolingday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      },
      heatingday: {
        schedule: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      },
    },
    lighting: {
      weekday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.6, 0.6, 0.5, 0.2, 0.05, 0.05],
      },
      saturday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.3, 0.6, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.5, 0.3, 0.3, 0.1, 0.05, 0.05],
      },
      sunday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.4, 0.4, 0.6, 0.6, 0.6, 0.6, 0.6, 0.4, 0.2, 0.05, 0.05, 0.05, 0.05, 0.05],
      },
      coolingday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.6, 0.6, 0.5, 0.2, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.6, 0.6, 0.5, 0.2, 0.05, 0.05],
      },
    },
    equipment: {
      weekday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.6, 0.6, 0.5, 0.2, 0.05, 0.05],
      },
      saturday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.3, 0.6, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.5, 0.3, 0.3, 0.1, 0.05, 0.05],
      },
      sunday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.4, 0.4, 0.6, 0.6, 0.6, 0.6, 0.6, 0.4, 0.2, 0.05, 0.05, 0.05, 0.05, 0.05],
      },
      coolingday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.6, 0.6, 0.5, 0.2, 0.05, 0.05],
      },
      heatingday: {
        schedule: [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.2, 0.5, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.6, 0.6, 0.5, 0.2, 0.05, 0.05],
      },
    },
  },
}

export const envelopeParams: EnvelopeParams = {
  concrete: {
    wall: [
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.15,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
      {
        Name: 'polystyreneFoam',
        Roughness: 'Rough',
        Thickness: 0.05,
        Conductivity: 0.037,
        Density: 25,
        Specific_Heat: 1400,
      },
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.15,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
    ],
    internal_wall: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    roof: [
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.2,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
      {
        Name: 'polystyreneFoam',
        Roughness: 'Rough',
        Thickness: 0.05,
        Conductivity: 0.037,
        Density: 25,
        Specific_Heat: 1400,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    floor: [
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.1,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
      {
        Name: 'polystyreneFoam',
        Roughness: 'Rough',
        Thickness: 0.05,
        Conductivity: 0.037,
        Density: 25,
        Specific_Heat: 1400,
      },
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.1,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
    ],
    ceiling: [
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.1,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
      {
        Name: 'polystyreneFoam',
        Roughness: 'Rough',
        Thickness: 0.05,
        Conductivity: 0.037,
        Density: 25,
        Specific_Heat: 1400,
      },
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.1,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
    ],
    window: {
      uvalue: 3.4,
      shgc: 0.59,
      vt: 0.55,
    },
  },
  wood: {
    wall: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'glassWool',
        Roughness: 'Rough',
        Thickness: 0.1,
        Conductivity: 0.044,
        Density: 16,
        Specific_Heat: 838,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    internal_wall: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    roof: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'polystyreneFoam',
        Roughness: 'Rough',
        Thickness: 0.05,
        Conductivity: 0.037,
        Density: 25,
        Specific_Heat: 1400,
      },
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.024,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
    ],
    floor: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    ceiling: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    window: {
      uvalue: 3.4,
      shgc: 0.59,
      vt: 0.55,
    },
  },
  traditional: {
    wall: [
      {
        Name: 'stucco',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.727,
        Density: 1320,
        Specific_Heat: 1046,
      },
      {
        Name: 'soil',
        Roughness: 'Rough',
        Thickness: 0.5,
        Conductivity: 0.894,
        Density: 1280,
        Specific_Heat: 1037,
      },
      {
        Name: 'stucco',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.727,
        Density: 1320,
        Specific_Heat: 1046,
      },
    ],
    internal_wall: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    roof: [
      {
        Name: 'tile',
        Roughness: 'Rough',
        Thickness: 0.3,
        Conductivity: 0.96,
        Density: 1280,
        Specific_Heat: 1188,
      },
      {
        Name: 'cedar',
        Roughness: 'Rough',
        Thickness: 0.2,
        Conductivity: 0.097,
        Density: 380,
        Specific_Heat: 2061,
      },
    ],
    floor: [
      {
        Name: 'normalConcrete',
        Roughness: 'Rough',
        Thickness: 0.5,
        Conductivity: 1.637,
        Density: 2000,
        Specific_Heat: 1000,
      },
    ],
    ceiling: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    window: {
      uvalue: 3.4,
      shgc: 0.59,
      vt: 0.55,
    },
  },
  experiment: {
    wall: [
      {
        "Name": "polyurethaneFoam",
        "Roughness": "Rough",
        "Thickness": 0.01,
        "Conductivity": 0.023,
        "Density": 32,
        "Specific_Heat": 1470,
      },
      {
        "Name": "rawanPlywood",
        "Roughness": "Rough",
        "Thickness": 0.012,
        "Conductivity": 0.15,
        "Density": 556,
        "Specific_Heat": 1880,
      },
    ],
    internal_wall: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    roof: [
      {
        "Name": "acrylicBoard",
        "Roughness": "Rough",
        "Thickness": 0.003,
        "Conductivity": 0.19,
        "Density": 1190,
        "Specific_Heat": 1500,
      },
    ],
    floor: [
      {
        "Name": "polyurethaneFoam",
        "Roughness": "Rough",
        "Thickness": 0.01,
        "Conductivity": 0.023,
        "Density": 32,
        "Specific_Heat": 1470,
      },
      {
        "Name": "rawanPlywood",
        "Roughness": "Rough",
        "Thickness": 0.012,
        "Conductivity": 0.15,
        "Density": 556,
        "Specific_Heat": 1880,
      },
    ],
    ceiling: [
      {
        Name: 'plywood',
        Roughness: 'Rough',
        Thickness: 0.012,
        Conductivity: 0.129,
        Density: 500,
        Specific_Heat: 2226,
      },
      {
        Name: 'gypsumBoard',
        Roughness: 'Rough',
        Thickness: 0.01,
        Conductivity: 0.213,
        Density: 1000,
        Specific_Heat: 854,
      },
    ],
    window: {
      uvalue: 3.4,
      shgc: 0.59,
      vt: 0.55,
    },
  },
}

export const InsulationMaterials:OpaqueSetting[]=[
  {
    "Name":"glassWool",
    "Roughness":"Rough",
    "Thickness": 0.3,
    "Conductivity": 0.051,
    "Density": 24,
    "Specific_Heat": 350,
  },
  {
    "Name":"polyethyleneFoam",
    "Roughness":"Rough",
    "Thickness": 0.3,
    "Conductivity": 0.044,
    "Density": 10,
    "Specific_Heat": 6500,
  },
];

export const OpaqueMaterials: OpaqueSetting[]=[
  {
    "Name":"aluminium",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 237.3,
    "Density": 2700,
    "Specific_Heat": 879,
  },
  {
    "Name":"mildSteel",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 48.05,
    "Density": 7850,
    "Specific_Heat": 438,
  },
  {
    "Name":"stainless",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 24.74,
    "Density": 7900,
    "Specific_Heat": 406,
  },
  {
    "Name":"ALC",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 0.15,
    "Density": 650,
    "Specific_Heat": 1015,
  },
  {
    "Name": 'normalConcrete',
    "Roughness": 'Rough',
    "Thickness": 0.5,
    "Conductivity": 1.637,
    "Density": 2000,
    "Specific_Heat": 1000,
  },
  {
    "Name": 'glass',
    "Roughness": 'Rough',
    "Thickness": 0.05,
    "Conductivity": 0.65,
    "Density": 2500,
    "Specific_Heat": 670,
  },
  {
    "Name":"cinderConcrete",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 0.802,
    "Density": 2300,
    "Specific_Heat": 777,
  },
  {
    "Name":"mortar",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 1.087,
    "Density": 2100,
    "Specific_Heat": 1098,
  },
  {
    "Name":"plywood",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 0.129,
    "Density": 620,
    "Specific_Heat": 1795,
  },
  {
    "Name":"slateBoard",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 1.264,
    "Density": 1500,
    "Specific_Heat": 843,
  },
  {
    "Name":"siding",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 0.17,
    "Density": 1000,
    "Specific_Heat": 1659,
  },
  {
    "Name":"cementBoard",
    "Roughness":"Rough",
    "Thickness": 0.1,
    "Conductivity": 0.15,
    "Density": 600,
    "Specific_Heat": 1659,
  },
];