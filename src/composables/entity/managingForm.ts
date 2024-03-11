import { ref, computed, type Ref } from "vue";
import deepClone from 'deep-clone'

export function useManagingForm<T>(
    data: Ref<T>, 
    saveData: () => Promise<void> = async () => {}, 
    onStartClicked = () => {},
    onCancelClicked = () => {},
    onSaveClicked = () => {}
)
{
    const backupData: Ref<T> = ref(data.value) as any;
    backupData.value = deepClone(data.value);

    const isEditing = ref(false);

    function editStart() {
        onStartClicked();
        backupData.value = deepClone(data.value);
        isEditing.value = true;
    }

    function editCancel() {
        onCancelClicked();
        data.value = backupData.value;
        isEditing.value = false;
      }

    async function editSave() {
        onSaveClicked();
        await saveData();
        isEditing.value = false;
      }

      const editBtnIcon = computed(() => {
        return isEditing.value ? 'mdi-close' : 'mdi-pencil';
    });
    const editBtnColor = computed(() => {
        return isEditing.value ? 'warning' : 'primary';
    });
    const editBtnCallback = computed(() => {
        return isEditing.value ? editCancel : editStart;
    });
    const editInputVariant = computed(() => {
        return isEditing.value ? 'outlined' : 'underlined';
    });
    const editInputDisabled = computed(() => {
        return !isEditing.value;
    });

    return {
        editStart,
        editCancel,
        editSave,
        data,
        backupData,
        isEditing,
        editBtnIcon,
        editBtnColor,
        editBtnCallback,
        editInputVariant,
        editInputDisabled
    };
}
