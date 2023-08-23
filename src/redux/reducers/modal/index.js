// ** Initial State
import {
    showAddCategoryModal,
    showAddDDOptionModal,
    showAddGameModal,
    showAddLSModal,
    showAddPeriodModal,
    showAddProduct,
    showAddRoleModal,
    showAddSBSGModal,
    showAddStudyModal,
    showAddSubjectTopicsModal,
    showAddTaskModal,
    showAddTopicContentModal,
    showAddTopicModal,
    showAdminAbstractModal,
    showAdsModal,
    showAdsPricingModal,
    showChangePwdModal,
    showChannelSelectModal,
    showCreateAdmin,
    showCreateChannelModal,
    showCreateClassModal,
    showCreateEvent,
    showCreateExamPlanModal,
    showCreateLSModal,
    showCreateMockExam,
    showCreatorSelectModal,
    showDateRangerPickerModal,
    showEditDayPlanModal,
    showExamSelectModal,
    showItemSelectModal,
    showMockExamSelectModal,
    showReportIssueModal,
    showRoleSelectModal,
    showSaleDetailModal,
    showSearchMenuModal,
    showSelectLanguageModal,
    showSyllabusSelectModal,
    showTermsLevelSelectModal,
    showTotalUserDetailModal,
    showUploadModal
} from "../../actions/modal";

const initialState = {
    isVisibleCreate: false,
    isVisibleAddSubject: false,
    isVisibleAddMedia: false,
    isVisibleLevelSelectModal: false,
    isVisibleSyllabusSelectModal: false,
    isVisibleAddLevel: false,
    isVisibleSubjectSelect: false,
    showTermsLevelSelectModal: false,
    showStaticSingleSelectModal: false,
    showTotalUserDetailModal: false,
    showCreatorSelectModal: false,
    showCreateLSModal: false,
    showAddLSModal: false,
    showChannelSelectModal: false,
    showCreateChannelModal: false,
    showAddTaskModal: false,
    showSBSGModal: false,
    showAddDDOptionModal: false,
    showAddTopicModal: false,
    showAddTopicContentModal: false,
    showAddPeriodModal: false,
    showAddSBSGModal: false,
    showUploadModal: false,
    showCreateEvent: false,
    showChangePwdModal: false,
    showSelectLanguageModal: false,
    showAddStudyModal: false,
    showCreateMockExam: false,
    showSearchMenuModal: false,
    showReportIssueModal: false,
    showSaleDetailModal: false,
    showAddCategoryModal: false,
    showAddProduct: false,
    showAdsModal: false,
    showAdsPricingModal: false,
    showDateRangerPickerModal: false,
    showCreateExamPlanModal: false,
    showExamSelectModal: false,
    showEditDayPlanModal: false,
    showAddSubjectTopicsModal: false,
    showItemSelectModal: false,
    showMockExamSelectModal: false,
    showCreateClassModal: false,
    showAddGameModal: false,
    showCreateAdmin: false,
    showRoleSelectModal: false,
    showAccessSelectModal: false,
    showAddRoleModal: false,
    showAdminAbstractModal: false,
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'showCreateModal':
            return {...state, isVisibleCreate: action.isVisibleCreate}
        case 'hideCreateModal':
            return {...state, isVisibleCreate: action.isVisibleCreate}
        // Create Modal
        case 'showAddSubjectModal':
            return {...state, isVisibleAddSubject: action.isVisibleAddSubject}
        case 'hideAddSubjectModal':
            return {...state, isVisibleAddSubject: action.isVisibleAddSubject}
        case 'showAddMediaModal':
            return {...state, isVisibleAddMedia: action.isVisibleAddMedia}
        case 'hideAddMediaModal':
            return {...state, isVisibleAddMedia: action.isVisibleAddMedia}

        // Subject
        case 'showLevelSelectModal':
            return {...state, isVisibleLevelSelectModal: action.isVisibleLevelSelectModal}
        case 'hideLevelSelectModal':
            return {...state, isVisibleLevelSelectModal: action.isVisibleLevelSelectModal}
        case 'showSyllabusSelectModal':
            return {...state, isVisibleSyllabusSelectModal: action.isVisibleSyllabusSelectModal}
        case 'hideSyllabusSelectModal':
            return {...state, isVisibleSyllabusSelectModal: action.isVisibleSyllabusSelectModal}
        case 'showAddLevel':
            return {...state, isVisibleAddLevel: action.isVisibleAddLevel}
        case 'hideAddLevel':
            return {...state, isVisibleAddLevel: action.isVisibleAddLevel}
        case 'showAddSyllabus':
            return {...state, isVisibleAddSyllabus: action.isVisibleAddSyllabus}
        case 'hideAddSyllabus':
            return {...state, isVisibleAddSyllabus: action.isVisibleAddSyllabus}

        // Media
        case 'showSubjectSelectModal':
            return {...state, isVisibleSubjectSelect: action.isVisibleSubjectSelect}
        case 'hideSubjectSelectModal':
            return {...state, isVisibleSubjectSelect: action.isVisibleSubjectSelect}
        case 'showUserTypeSelectModal':
            return {...state, isVisibleUserTypeSelect: action.isVisibleUserTypeSelect}
        case 'hideUserTypeSelectModal':
            return {...state, isVisibleUserTypeSelect: action.isVisibleUserTypeSelect}
        case 'showMediaLibModal':
            return {...state, isVisibleMediaLib: action.isVisibleMediaLib}
        case 'hideMediaLibModal':
            return {...state, isVisibleMediaLib: action.isVisibleMediaLib}
        case 'showAddCommunity':
            return {...state, isVisibleAddCommunity: action.isVisibleAddCommunity}
        case 'hideAddCommunity':
            return {...state, isVisibleAddCommunity: action.isVisibleAddCommunity}
        case 'showCreatePlanModal':
            return {...state, isVisibleCreatePlan: action.isVisibleCreatePlan}
        case 'hideCreatePlanModal':
            return {...state, isVisibleCreatePlan: action.isVisibleCreatePlan}
        case 'showSubscriptionPlanModal':
            return {...state, isVisibleSubscriptionPlanModal: action.isVisibleSubscriptionPlanModal}
        case 'hideSubscriptionPlanModal':
            return {...state, isVisibleSubscriptionPlanModal: action.isVisibleSubscriptionPlanModal}
        case 'showEventPlanModal':
            return {...state, isVisibleEventPlanModal: action.isVisibleEventPlanModal}
        case 'hideEventPlanModal':
            return {...state, isVisibleEventPlanModal: action.isVisibleEventPlanModal}
        case 'isVisibleModuleSelectModal':
            return {...state, isVisibleModuleSelectModal: action.isVisibleModuleSelectModal}
        case 'showStaticSingleSelectModal':
            return {...state, showStaticSingleSelectModal: action.showStaticSingleSelectModal}
        case 'showTotalUserDetailModal':
            return {...state, showTotalUserDetailModal: action.showTotalUserDetailModal}
        case 'showTermsLevelSelectModal':
            return {...state, showTermsLevelSelectModal: action.showTermsLevelSelectModal}
        case 'showCreatorSelectModal':
            return {...state, showCreatorSelectModal: action.showCreatorSelectModal}
        case 'showCreateLSModal':
            return {...state, showCreateLSModal: action.showCreateLSModal}
        case 'showAddLSModal':
            return {...state, showAddLSModal: action.showAddLSModal}
        case 'showChannelSelectModal':
            return {...state, showChannelSelectModal: action.showChannelSelectModal}
        case 'showCreateChannelModal':
            return {...state, showCreateChannelModal: action.showCreateChannelModal}
        case 'showAddTaskModal':
            return {...state, showAddTaskModal: action.showAddTaskModal}
        case 'showSBSGModal':
            return {...state, showSBSGModal: action.showSBSGModal}
        case 'showAddDDOptionModal':
            return {...state, showAddDDOptionModal: action.showAddDDOptionModal}
        case 'showAddTopicModal':
            return {...state, showAddTopicModal: action.showAddTopicModal}
        case 'showAddTopicContentModal':
            return {...state, showAddTopicContentModal: action.showAddTopicContentModal}
        case 'showAddPeriodModal':
            return {...state, showAddPeriodModal: action.showAddPeriodModal}
        case 'showAddSBSGModal':
            return {...state, showAddSBSGModal: action.showAddSBSGModal}
        case 'showUploadModal':
            return {...state, showUploadModal: action.showUploadModal}
        case 'showCreateEvent':
            return {...state, showCreateEvent: action.showCreateEvent}
        case 'showChangePwdModal':
            return {...state, showChangePwdModal: action.showChangePwdModal}
        case 'showSelectLanguageModal':
            return {...state, showSelectLanguageModal: action.showSelectLanguageModal}
        case 'showAddStudyModal':
            return {...state, showAddStudyModal: action.showAddStudyModal}
        case 'showCreateMockExam':
            return {...state, showCreateMockExam: action.showCreateMockExam}
        case 'showSearchMenuModal':
            return {...state, showSearchMenuModal: action.showSearchMenuModal}
        case 'showReportIssueModal':
            return {...state, showReportIssueModal: action.showReportIssueModal}
        case 'showSaleDetailModal':
            return {...state, showSaleDetailModal: action.showSaleDetailModal}
        case 'showAddCategoryModal':
            return {...state, showAddCategoryModal: action.showAddCategoryModal}
        case 'showAddProduct':
            return {...state, showAddProduct: action.showAddProduct}
        case 'showAdsModal':
            return {...state, showAdsModal: action.showAdsModal}
        case 'showAdsPricingModal':
            return {...state, showAdsPricingModal: action.showAdsPricingModal}
        case 'showDateRangerPickerModal':
            return {...state, showDateRangerPickerModal: action.showDateRangerPickerModal}
        case 'showCreateExamPlanModal':
            return {...state, showCreateExamPlanModal: action.showCreateExamPlanModal}
        case 'showExamSelectModal':
            return {...state, showExamSelectModal: action.showExamSelectModal}
        case 'showEditDayPlanModal':
            return {...state, showEditDayPlanModal: action.showEditDayPlanModal}
        case 'showAddSubjectTopicsModal':
            return {...state, showAddSubjectTopicsModal: action.showAddSubjectTopicsModal}
        case 'showItemSelectModal':
            return {...state, showItemSelectModal: action.showItemSelectModal}
        case 'showMockExamSelectModal':
            return {...state, showMockExamSelectModal: action.showMockExamSelectModal}
        case 'showCreateClassModal':
            return {...state, showCreateClassModal: action.showCreateClassModal}
        case 'showAddGameModal':
            return {...state, showAddGameModal: action.showAddGameModal}
        case 'showCreateAdmin':
            return {...state, showCreateAdmin: action.showCreateAdmin}
        case 'showRoleSelectModal':
            return {...state, showRoleSelectModal: action.showRoleSelectModal}
        case 'showAccessSelectModal':
            return {...state, showAccessSelectModal: action.showAccessSelectModal}
        case 'showAddRoleModal':
            return {...state, showAddRoleModal: action.showAddRoleModal}
        case 'showAdminAbstractModal':
            return {...state, showAdminAbstractModal: action.showAdminAbstractModal}

        default:
            return state
    }
}

export default modalReducer
