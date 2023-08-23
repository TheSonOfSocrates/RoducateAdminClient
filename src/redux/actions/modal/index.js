export const showCreateModal = () => dispatch => dispatch({type: 'showCreateModal', isVisibleCreate: true})
export const hideCreateModal = () => dispatch => dispatch({type: 'hideCreateModal', isVisibleCreate: false})

// Create Modal
export const showAddSubjectModal = () => dispatch => dispatch({type: 'showAddSubjectModal', isVisibleAddSubject: true})
export const hideAddSubjectModal = () => dispatch => dispatch({type: 'hideAddSubjectModal', isVisibleAddSubject: false})

export const showAddMediaModal = () => dispatch => dispatch({type: 'showAddMediaModal', isVisibleAddMedia: true})
export const hideAddMediaModal = () => dispatch => dispatch({type: 'hideAddMediaModal', isVisibleAddMedia: false})


// Subject
export const showLevelSelectModal = () => dispatch => dispatch({
    type: 'showLevelSelectModal',
    isVisibleLevelSelectModal: true
})
export const hideLevelSelectModal = () => dispatch => dispatch({
    type: 'hideLevelSelectModal',
    isVisibleLevelSelectModal: false
})

export const showSyllabusSelectModal = () => dispatch => dispatch({
    type: 'showSyllabusSelectModal',
    isVisibleSyllabusSelectModal: true
})
export const hideSyllabusSelectModal = () => dispatch => dispatch({
    type: 'hideSyllabusSelectModal',
    isVisibleSyllabusSelectModal: false
})

export const showAddLevel = () => dispatch => dispatch({type: 'showAddLevel', isVisibleAddLevel: true})
export const hideAddLevel = () => dispatch => dispatch({type: 'hideAddLevel', isVisibleAddLevel: false})

export const showAddSyllabus = () => dispatch => dispatch({type: 'showAddSyllabus', isVisibleAddSyllabus: true})
export const hideAddSyllabus = () => dispatch => dispatch({type: 'hideAddSyllabus', isVisibleAddSyllabus: false})

// Media
export const showSubjectSelectModal = () => dispatch => dispatch({
    type: 'showSubjectSelectModal',
    isVisibleSubjectSelect: true
})
export const hideSubjectSelectModal = () => dispatch => dispatch({
    type: 'hideSubjectSelectModal',
    isVisibleSubjectSelect: false
})

export const showUserTypeSelectModal = () => dispatch => dispatch({
    type: 'showUserTypeSelectModal',
    isVisibleUserTypeSelect: true
})
export const hideUserTypeSelectModal = () => dispatch => dispatch({
    type: 'hideUserTypeSelectModal',
    isVisibleUserTypeSelect: false
})

export const showMediaLibModal = () => dispatch => dispatch({type: 'showMediaLibModal', isVisibleMediaLib: true})
export const hideMediaLibModal = () => dispatch => dispatch({type: 'hideMediaLibModal', isVisibleMediaLib: false})

export const showAddCommunity = () => dispatch => dispatch({type: 'showAddCommunity', isVisibleAddCommunity: true})
export const hideAddCommunity = () => dispatch => dispatch({type: 'hideAddCommunity', isVisibleAddCommunity: false})

export const showCreatePlanModal = () => dispatch => dispatch({type: 'showCreatePlanModal', isVisibleCreatePlan: true})
export const hideCreatePlanModal = () => dispatch => dispatch({type: 'hideCreatePlanModal', isVisibleCreatePlan: false})


export const showSubscriptionPlanModal = () => dispatch => dispatch({
    type: 'showSubscriptionPlanModal',
    isVisibleSubscriptionPlanModal: true
})
export const hideSubscriptionPlanModal = () => dispatch => dispatch({
    type: 'hideSubscriptionPlanModal',
    isVisibleSubscriptionPlanModal: false
})

export const showEventPlanModal = () => dispatch => dispatch({
    type: 'showEventPlanModal',
    isVisibleEventPlanModal: true
})
export const hideEventPlanModal = () => dispatch => dispatch({
    type: 'hideEventPlanModal',
    isVisibleEventPlanModal: false
})

export const showModuleSelectModal = (isVisibleModuleSelectModal) => dispatch => dispatch({
    type: 'isVisibleModuleSelectModal',
    isVisibleModuleSelectModal
})

export const showStaticSingleSelectModal = (showStaticSingleSelectModal = false) => dispatch => dispatch({
    type: 'showStaticSingleSelectModal',
    showStaticSingleSelectModal
})

export const showTotalUserDetailModal = (showTotalUserDetailModal = false) => dispatch => dispatch({
    type: 'showTotalUserDetailModal',
    showTotalUserDetailModal
})

export const showTermsLevelSelectModal = (showTermsLevelSelectModal = false) => dispatch => dispatch({
    type: 'showTermsLevelSelectModal',
    showTermsLevelSelectModal
})

export const showCreatorSelectModal = (showCreatorSelectModal = false) => dispatch => dispatch({
    type: 'showCreatorSelectModal',
    showCreatorSelectModal
})

export const showCreateLSModal = (showCreateLSModal = false) => dispatch => dispatch({
    type: 'showCreateLSModal',
    showCreateLSModal
})

export const showAddLSModal = (showAddLSModal = false) => dispatch => dispatch({
    type: 'showAddLSModal',
    showAddLSModal
})

export const showChannelSelectModal = (showChannelSelectModal = false) => dispatch => dispatch({
    type: 'showChannelSelectModal',
    showChannelSelectModal
})

export const showCreateChannelModal = (showCreateChannelModal = false) => dispatch => dispatch({
    type: 'showCreateChannelModal',
    showCreateChannelModal
})

export const showAddTaskModal = (showAddTaskModal = false) => dispatch => dispatch({
    type: 'showAddTaskModal',
    showAddTaskModal
})

export const showSBSGModal = (showSBSGModal = false) => dispatch => dispatch({
    type: 'showSBSGModal',
    showSBSGModal
})

export const showAddDDOptionModal = (showAddDDOptionModal = false) => dispatch => dispatch({
    type: 'showAddDDOptionModal',
    showAddDDOptionModal
})

export const showAddTopicModal = (showAddTopicModal = false) => dispatch => dispatch({
    type: 'showAddTopicModal',
    showAddTopicModal
})

export const showAddTopicContentModal = (showAddTopicContentModal = false) => dispatch => dispatch({
    type: 'showAddTopicContentModal',
    showAddTopicContentModal
})

export const showAddPeriodModal = (showAddPeriodModal = false) => dispatch => dispatch({
    type: 'showAddPeriodModal',
    showAddPeriodModal
})

export const showAddSBSGModal = (showAddSBSGModal = false) => dispatch => dispatch({
    type: 'showAddSBSGModal',
    showAddSBSGModal
})

export const showUploadModal = (showUploadModal = false) => dispatch => dispatch({
    type: 'showUploadModal',
    showUploadModal
})

export const showCreateEvent = (showCreateEvent = false) => dispatch => dispatch({
    type: 'showCreateEvent',
    showCreateEvent
})

export const showChangePwdModal = (showChangePwdModal = false) => dispatch => dispatch({
    type: 'showChangePwdModal',
    showChangePwdModal
})

export const showSelectLanguageModal = (showSelectLanguageModal = false) => dispatch => dispatch({
    type: 'showSelectLanguageModal',
    showSelectLanguageModal
})

export const showAddStudyModal = (showAddStudyModal = false) => dispatch => dispatch({
    type: 'showAddStudyModal',
    showAddStudyModal
})

export const showCreateMockExam = (showCreateMockExam = false) => dispatch => dispatch({
    type: 'showCreateMockExam',
    showCreateMockExam
})

export const showSearchMenuModal = (showSearchMenuModal = false) => dispatch => dispatch({
    type: 'showSearchMenuModal',
    showSearchMenuModal
})

export const showReportIssueModal = (showReportIssueModal = false) => dispatch => dispatch({
    type: 'showReportIssueModal',
    showReportIssueModal
})

export const showSaleDetailModal = (showSaleDetailModal = false) => dispatch => dispatch({
    type: 'showSaleDetailModal',
    showSaleDetailModal
})

export const showAddCategoryModal = (showAddCategoryModal = false) => dispatch => dispatch({
    type: 'showAddCategoryModal',
    showAddCategoryModal
})

export const showAddProduct = (showAddProduct = false) => dispatch => dispatch({
    type: 'showAddProduct',
    showAddProduct
})

export const showAdsModal = (showAdsModal = false) => dispatch => dispatch({
    type: 'showAdsModal',
    showAdsModal
})

export const showAdsPricingModal = (showAdsPricingModal = false) => dispatch => dispatch({
    type: 'showAdsPricingModal',
    showAdsPricingModal
})

export const showDateRangerPickerModal = (showDateRangerPickerModal = false) => dispatch => dispatch({
    type: 'showDateRangerPickerModal',
    showDateRangerPickerModal
})

export const showCreateExamPlanModal = (showCreateExamPlanModal = false) => dispatch => dispatch({
    type: 'showCreateExamPlanModal',
    showCreateExamPlanModal
})

export const showExamSelectModal = (showExamSelectModal = false) => dispatch => dispatch({
    type: 'showExamSelectModal',
    showExamSelectModal
})

export const showEditDayPlanModal = (showEditDayPlanModal = false) => dispatch => dispatch({
    type: 'showEditDayPlanModal',
    showEditDayPlanModal
})

export const showAddSubjectTopicsModal = (showAddSubjectTopicsModal = false) => dispatch => dispatch({
    type: 'showAddSubjectTopicsModal',
    showAddSubjectTopicsModal
})

export const showItemSelectModal = (showItemSelectModal = false) => dispatch => dispatch({
    type: 'showItemSelectModal',
    showItemSelectModal
})

export const showMockExamSelectModal = (showMockExamSelectModal = false) => dispatch => dispatch({
    type: 'showMockExamSelectModal',
    showMockExamSelectModal
})

export const showCreateClassModal = (showCreateClassModal = false) => dispatch => dispatch({
    type: 'showCreateClassModal',
    showCreateClassModal
})

export const showAddGameModal = (showAddGameModal = false) => dispatch => dispatch({
    type: 'showAddGameModal',
    showAddGameModal
})

export const showCreateAdmin = (showCreateAdmin = false) => dispatch => dispatch({
    type: 'showCreateAdmin',
    showCreateAdmin
})

export const showRoleSelectModal = (showRoleSelectModal = false) => dispatch => dispatch({
    type: 'showRoleSelectModal',
    showRoleSelectModal
})

export const showAccessSelectModal = (showAccessSelectModal = false) => dispatch => dispatch({
    type: 'showAccessSelectModal',
    showAccessSelectModal
})

export const showAddRoleModal = (showAddRoleModal = false) => dispatch => dispatch({
    type: 'showAddRoleModal',
    showAddRoleModal
})

export const showAdminAbstractModal = (showAdminAbstractModal = false) => dispatch => dispatch({
    type: 'showAdminAbstractModal',
    showAdminAbstractModal
})