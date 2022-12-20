export type slashOption = {
    type: string;
    name: string;
    description: string;
    required: boolean;
};

export type slashOptions = Array<slashOption>;

export type slashCommand = {
    name: string;
    description: string;
    options?: slashOptions;
};
