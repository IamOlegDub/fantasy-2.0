// consts.ts
export const GK = 'Goalkeepers';
export const DF = 'Defenders';
export const MF = 'Midfielders';
export const FW = 'Forwards';

export const GK_COLOR = 'bg-[#ffeaa7]';
export const DF_COLOR = 'bg-[#74b9ff]';
export const MF_COLOR = 'bg-[#55efc4]';
export const FW_COLOR = 'bg-[#ff7675]';

// Position type definition
export type Position = typeof GK | typeof DF | typeof MF | typeof FW;

// This function returns a short position name based on a long position name.
export const getShortPosName = (longPosName: Position): string => {
    if (longPosName === GK) {
        return 'GK';
    }
    if (longPosName === DF) {
        return 'DF';
    }
    if (longPosName === MF) {
        return 'MF';
    }
    if (longPosName === FW) {
        return 'FW';
    }
    return longPosName;
};

// This function returns the item color based on the position.
export const getItemColor = (position: Position): string => {
    if (position === GK) {
        return GK_COLOR; // Assuming you define the actual color elsewhere
    }
    if (position === DF) {
        return DF_COLOR;
    }
    if (position === MF) {
        return MF_COLOR;
    }
    if (position === FW) {
        return FW_COLOR;
    }
    return 'transparent'; // Default color if none of the conditions are met
};

// This function returns the text color based on the position.
export const getTextColor = (position: Position): string => {
    if (position === GK) {
        return 'text-[#ff9f43]';
    }
    if (position === DF) {
        return 'text-[#2e86de]';
    }
    if (position === MF) {
        return 'text-[#10ac84]';
    }
    if (position === FW) {
        return 'text-[#ee5253]';
    }
    return 'text-black'; // Default text color if none of the conditions are met
};
