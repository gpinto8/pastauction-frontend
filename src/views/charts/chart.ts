export const chartCategorySingle = "single";
export const chartCategoryMini = "mini";
export const chartCategoryFull = "full";

export type ChartCategory = typeof chartCategorySingle |
    typeof chartCategoryMini |
    typeof chartCategoryFull

export const categories = [chartCategorySingle, chartCategoryMini, chartCategoryFull]