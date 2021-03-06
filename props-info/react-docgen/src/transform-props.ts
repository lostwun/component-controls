import { PropTypes, PropType, TypeInformation } from '@component-controls/core';

const rdPropToCCProp = (rdProp: any): PropType => {
  const prop: Partial<PropType> = {};
  if (rdProp.description) {
    prop.description = rdProp.description;
  }
  if (rdProp.defaultValue !== null && rdProp.defaultValue !== undefined) {
    prop.defaultValue = rdProp.defaultValue.value ?? rdProp.defaultValue;
  }
  let type: Partial<TypeInformation> = {};
  if (rdProp.type) {
    type = propTypeToCCType({ ...rdProp.type, required: rdProp.required });
  } else if (rdProp.tsType) {
    type = tsTypeToCCType({ ...rdProp.tsType, required: rdProp.required });
  } else if (rdProp.flowType) {
    type = tsTypeToCCType({ ...rdProp.flowType, required: rdProp.required });
  }
  prop.type = type as TypeInformation;
  return prop as PropType;
};
const propTypeToCCType = (dgType: any): TypeInformation => {
  let type: Partial<TypeInformation> = {};
  if (dgType) {
    const typeName = dgType.name;
    if (dgType.required) {
      type.required = true;
    }
    switch (typeName) {
      case 'arrayOf':
      case 'array':
        type = {
          name: 'array',
        };
        if (dgType.value) {
          type.value = Object.keys(dgType.value).map(name => ({
            name: dgType.value[name],
          }));
        }
        break;
      case 'bool':
        type = {
          name: 'boolean',
        };
        break;
      case 'enum':
        type = {
          name: 'enum',
          value: dgType.value.map(({ value }: any) => {
            return {
              name: typeof value,
              value,
            };
          }),
        };
        break;
      case 'element':
      case 'elementType':
      case 'node':
        type = {
          name: 'any',
          raw: typeName,
        };
        break;

      case 'objectOf':
        type = {
          name: 'object',
          value: Object.keys(dgType.value).map(key => ({
            name: dgType.value[key],
          })),
        };
        break;

      case 'instanceOf':
        type = {
          name: 'object',
          value: dgType.value,
          raw: typeName,
        };
        break;
      case 'shape':
      case 'exact':
        type = {
          name: 'object',
          value: Object.keys(dgType.value).map(name => {
            const t: TypeInformation = {
              name: dgType.value[name].name,
              value: name,
            };
            if (dgType.value[name].required) {
              t.required = true;
            }
            return t;
          }),
        };

        break;
      case 'union':
        type = {
          name: 'union',
          value: dgType.value.map((v: any) => propTypeToCCType(v)),
        };
        break;
      case 'func':
        type = {
          ...dgType,
          name: 'function',
        };
        break;

      default:
        type = dgType;
    }
  }
  return type as TypeInformation;
};

const tsTypeToCCType = (dgType: any): TypeInformation => {
  let type: Partial<TypeInformation> = {};
  if (dgType) {
    const typeName = dgType.name;
    if (dgType.required) {
      type.required = true;
    }
    switch (typeName) {
      case 'Array':
        type = {
          name: 'array',
          value: dgType.elements.map((element: any) => tsTypeToCCType(element)),
        };
        break;
      case 'signature':
        if (dgType.signature.arguments) {
          type = {
            name: 'function',
            value: tsTypeToCCType(dgType.signature.return),
            arguments: dgType.signature.arguments.map((v: any) =>
              tsTypeToCCType(v),
            ),
          };
        } else {
          type = {
            name: 'object',
            value: dgType.signature.properties.map((v: any) =>
              tsTypeToCCType(v),
            ),
          };
        }
        break;

      default:
        type = dgType;
    }
  }
  return type as TypeInformation;
};
export const transformProps = (props: any): PropTypes | undefined => {
  return props
    ? Object.keys(props).reduce((acc, name) => {
        const rdProp: any = props[name];
        const prop = rdPropToCCProp(rdProp);
        return { ...acc, [name]: prop };
      }, {})
    : undefined;
};
