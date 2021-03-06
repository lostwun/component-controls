import styled from '@emotion/styled';

const SPACING = 8;

const match = (
  requested: string,
  actual: string,
  value: number | string,
  fallback: number | string = 0,
) => (actual.split('-')[0] === requested ? value : fallback);

export const Arrow = styled.div<{ placement: string; borderColor: string }>(
  ({ placement, borderColor }) => ({
    position: 'absolute',
    borderStyle: 'solid',
    background: 'white',
    marginBottom: `${match('top', placement, '0', SPACING)}px`,
    marginTop: `${match('bottom', placement, '0', SPACING)}px`,
    marginRight: `${match('left', placement, '0', SPACING)}px`,
    marginLeft: `${match('right', placement, '0', SPACING)}px`,

    bottom: `${match('top', placement, SPACING * -1, 'auto')}px`,
    top: `${match('bottom', placement, SPACING * -1, 'auto')}px`,
    right: `${match('left', placement, SPACING * -1, 'auto')}px`,
    left: `${match('right', placement, SPACING * -1, 'auto')}px`,

    borderBottomWidth: `${match('top', placement, '0', SPACING)}px`,
    borderTopWidth: `${match('bottom', placement, '0', SPACING)}px`,
    borderRightWidth: `${match('left', placement, '0', SPACING)}px`,
    borderLeftWidth: `${match('right', placement, '0', SPACING)}px`,

    borderTopColor: match(
      'top',
      placement,
      borderColor,
      'transparent',
    ) as string,
    borderBottomColor: match(
      'bottom',
      placement,
      borderColor,
      'transparent',
    ) as string,
    borderLeftColor: match(
      'left',
      placement,
      borderColor,
      'transparent',
    ) as string,
    borderRightColor: match(
      'right',
      placement,
      borderColor,
      'transparent',
    ) as string,
  }),
);

export const Wrapper = styled.div<{
  placement: string;
  borderColor: string;
  hidden: boolean;
}>(({ placement, borderColor, hidden }) => ({
  display: hidden ? 'none' : 'inline-block',
  background: 'white',
  marginTop: `${match('bottom', placement, SPACING + 2, 0)}px`,
  marginLeft: `${match('right', placement, SPACING + 2, 0)}px`,
  marginRight: `${match('left', placement, SPACING + 2, 0)}px`,
  filter: `
  drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
  drop-shadow(0 1px 3px rgba(0,0,0,0.1))
`,
  borderRadius: 8,
  fontSize: 12,
  border: `1px solid ${borderColor}`,
}));
