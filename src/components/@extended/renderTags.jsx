import { Chip } from '@mui/material';

export function createRenderTags(labelField) {
    return function renderTags(tagValue, getTagProps) {
        return tagValue.map((option, index) => {
            const { key, ...rest } = getTagProps({ index });
            return <Chip key={key} {...rest} label={option[labelField]} />;
        });
    };
}
