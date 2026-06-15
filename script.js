// ============================================
// بيانات المواد والمعاملات لكل شعبة
// ============================================

const streamsData = {
    sciences: {
        name: 'علوم تجريبية',
        subjects: [
            { name: 'اللغة العربية', coefficient: 3 },
            { name: 'اللغة الفرنسية', coefficient: 2 },
            { name: 'اللغة الإنجليزية', coefficient: 2 },
            { name: 'التربية الإسلامية', coefficient: 2 },
            { name: 'التاريخ والجغرافيا', coefficient: 2 },
            { name: 'الرياضيات', coefficient: 5 },
            { name: 'العلوم الطبيعية', coefficient: 6 },
            { name: 'العلوم الفيزيائية', coefficient: 5 },
            { name: 'الفلسفة', coefficient: 2 },
            { name: 'التربية البدنية', coefficient: 1, isOptional: true }
        ]
    },
    math: {
        name: 'رياضيات',
        subjects: [
            { name: 'اللغة العربية', coefficient: 3 },
            { name: 'اللغة الفرنسية', coefficient: 2 },
            { name: 'اللغة الإنجليزية', coefficient: 2 },
            { name: 'التربية الإسلامية', coefficient: 2 },
            { name: 'التاريخ والجغرافيا', coefficient: 2 },
            { name: 'الرياضيات', coefficient: 7 },
            { name: 'العلوم الطبيعية', coefficient: 2 },
            { name: 'العلوم الفيزيائية', coefficient: 6 },
            { name: 'الفلسفة', coefficient: 2 },
            { name: 'التربية البدنية', coefficient: 1, isOptional: true }
        ]
    },
    technical: {
        name: 'تقني رياضي',
        subjects: [
            { name: 'اللغة العربية', coefficient: 3 },
            { name: 'اللغة الفرنسية', coefficient: 2 },
            { name: 'اللغة الإنجليزية', coefficient: 2 },
            { name: 'التربية الإسلامية', coefficient: 2 },
            { name: 'التاريخ والجغرافيا', coefficient: 2 },
            { name: 'الرياضيات', coefficient: 6 },
            { name: 'العلوم الفيزيائية', coefficient: 6 },
            { name: 'التكنولوجيا', coefficient: 7 },
            { name: 'الفلسفة', coefficient: 2 },
            { name: 'التربية البدنية', coefficient: 1, isOptional: true }
        ]
    },
    management: {
        name: 'تسيير واقتصاد',
        subjects: [
            { name: 'اللغة العربية', coefficient: 3 },
            { name: 'اللغة الفرنسية', coefficient: 2 },
            { name: 'اللغة الإنجليزية', coefficient: 2 },
            { name: 'التربية الإسلامية', coefficient: 2 },
            { name: 'التاريخ والجغرافيا', coefficient: 4 },
            { name: 'الرياضيات', coefficient: 5 },
            { name: 'الاقتصاد والمناجمنت', coefficient: 5 },
            { name: 'القانون', coefficient: 2 },
            { name: 'التسيير المحاسبي والمالي', coefficient: 6 },
            { name: 'الفلسفة', coefficient: 2 },
            { name: 'التربية البدنية', coefficient: 1, isOptional: true }
        ]
    },
    languages: {
        name: 'لغات أجنبية',
        subjects: [
            { name: 'اللغة العربية', coefficient: 5 },
            { name: 'اللغة الفرنسية', coefficient: 5 },
            { name: 'اللغة الإنجليزية', coefficient: 5 },
            { name: 'اللغة الأجنبية الثالثة', coefficient: 4 },
            { name: 'التربية الإسلامية', coefficient: 2 },
            { name: 'التاريخ والجغرافيا', coefficient: 2 },
            { name: 'الرياضيات', coefficient: 2 },
            { name: 'الفلسفة', coefficient: 2 },
            { name: 'التربية البدنية', coefficient: 1, isOptional: true }
        ]
    },
    literature: {
        name: 'آداب وفلسفة',
        subjects: [
            { name: 'اللغة العربية', coefficient: 6 },
            { name: 'اللغة الفرنسية', coefficient: 3 },
            { name: 'اللغة الإنجليزية', coefficient: 3 },
            { name: 'التربية الإسلامية', coefficient: 2 },
            { name: 'التاريخ والجغرافيا', coefficient: 4 },
            { name: 'الرياضيات', coefficient: 2 },
            { name: 'الفلسفة', coefficient: 6 },
            { name: 'التربية البدنية', coefficient: 1, isOptional: true }
        ]
    }
};

// ============================================
// المتغيرات العامة
// ============================================

let currentStream = null;
let gradesData = {};
let optionalSubjectsState = {}; // لتخزين حالة المواد الاختيارية

// ============================================
// العناصر في الصفحة
// ============================================

const streamSelect = document.getElementById('streamSelect');
const gradesSection = document.getElementById('gradesSection');
const gradesContainer = document.getElementById('gradesContainer');
const resultsSection = document.getElementById('resultsSection');
const explanationSection = document.getElementById('explanationSection');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const totalPointsDisplay = document.getElementById('totalPoints');
const totalCoefficientsDisplay = document.getElementById('totalCoefficients');
const finalAverageDisplay = document.getElementById('finalAverage');
const explanationDetails = document.getElementById('explanationDetails');

// ============================================
// الدوال الرئيسية
// ============================================

/**
 * تهيئة الحدث عند تغيير الشعبة
 */
streamSelect.addEventListener('change', (e) => {
    const selectedStream = e.target.value;
    
    if (!selectedStream) {
        hideGradesSection();
        return;
    }
    
    currentStream = selectedStream;
    gradesData = {};
    optionalSubjectsState = {}; // إعادة تعيين حالة المواد الاختيارية
    
    showGradesSection();
    renderGradeCards();
    hideResults();
    hideExplanation();
});

/**
 * عرض قسم إدخال العلامات
 */
function showGradesSection() {
    gradesSection.style.display = 'block';
    calculateBtn.style.display = 'flex';
    resetBtn.style.display = 'flex';
    
    // تمرير سلس
    gradesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * إخفاء قسم إدخال العلامات
 */
function hideGradesSection() {
    gradesSection.style.display = 'none';
    calculateBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    resultsSection.style.display = 'none';
    explanationSection.style.display = 'none';
}

/**
 * رسم بطاقات إدخال العلامات
 */
function renderGradeCards() {
    gradesContainer.innerHTML = '';
    
    const stream = streamsData[currentStream];
    
    stream.subjects.forEach((subject, index) => {
        const card = document.createElement('div');
        card.className = 'grade-card';
        card.id = `card-${index}`;
        
        // إذا كانت المادة اختيارية، نضع الحالة الافتراضية (مفعلة)
        if (subject.isOptional) {
            optionalSubjectsState[index] = true;
        }

        const label = document.createElement('label');
        label.className = 'grade-label';
        
        let optionalToggleHtml = '';
        if (subject.isOptional) {
            optionalToggleHtml = `
                <div style="margin-bottom: 10px; font-size: 0.85rem; color: #666; display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" id="toggle-${index}" checked onchange="toggleOptionalSubject(${index})">
                    <span>تفعيل المادة (غير معفى)</span>
                </div>
            `;
        }

        label.innerHTML = `
            ${subject.name}
            <span class="grade-coefficient">معامل: ${subject.coefficient}</span>
            ${optionalToggleHtml}
        `;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'grade-input';
        input.id = `grade-${index}`;
        input.min = '0';
        input.max = '20';
        input.step = '0.01';
        input.placeholder = 'أدخل العلامة من 0 إلى 20';
        input.dataset.subjectIndex = index;
        input.dataset.coefficient = subject.coefficient;
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'grade-error';
        errorMsg.id = `error-${index}`;
        
        input.addEventListener('input', (e) => {
            handleGradeInput(e, index);
        });
        
        input.addEventListener('blur', (e) => {
            validateGradeInput(e, index);
        });
        
        card.appendChild(label);
        card.appendChild(input);
        card.appendChild(errorMsg);
        
        gradesContainer.appendChild(card);
    });
}

/**
 * تبديل حالة المادة الاختيارية
 */
window.toggleOptionalSubject = function(index) {
    const isChecked = document.getElementById(`toggle-${index}`).checked;
    const card = document.getElementById(`card-${index}`);
    const input = document.getElementById(`grade-${index}`);
    
    optionalSubjectsState[index] = isChecked;
    
    if (isChecked) {
        card.style.opacity = '1';
        card.style.filter = 'none';
        input.disabled = false;
    } else {
        card.style.opacity = '0.5';
        card.style.filter = 'grayscale(1)';
        input.disabled = true;
        input.value = '';
        delete gradesData[index];
    }
};

/**
 * معالجة إدخال العلامة
 */
function handleGradeInput(event, index) {
    const value = event.target.value;
    const card = document.getElementById(`card-${index}`);
    const errorMsg = document.getElementById(`error-${index}`);
    
    // حفظ القيمة
    if (value !== '') {
        gradesData[index] = parseFloat(value);
    } else {
        delete gradesData[index];
    }
    
    // إزالة الخطأ عند البدء بالكتابة
    card.classList.remove('error');
    errorMsg.classList.remove('show');
}

/**
 * التحقق من صحة إدخال العلامة
 */
function validateGradeInput(event, index) {
    const value = event.target.value;
    const card = document.getElementById(`card-${index}`);
    const errorMsg = document.getElementById(`error-${index}`);
    
    if (value === '') {
        return; // حقل اختياري
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        showError(card, errorMsg, 'يجب إدخال رقم صحيح');
        return;
    }
    
    if (numValue < 0 || numValue > 20) {
        showError(card, errorMsg, 'العلامة يجب أن تكون بين 0 و 20');
        event.target.value = '';
        delete gradesData[index];
        return;
    }
    
    // إزالة الخطأ إذا كانت القيمة صحيحة
    card.classList.remove('error');
    errorMsg.classList.remove('show');
}

/**
 * عرض رسالة خطأ
 */
function showError(card, errorMsg, message) {
    card.classList.add('error');
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
}

/**
 * حساب المعدل
 */
function calculateAverage() {
    const stream = streamsData[currentStream];
    
    // التحقق من أن جميع العلامات المدفوعة (غير الاختيارية أو الاختيارية المفعلة) مدخلة
    let allFilled = true;
    stream.subjects.forEach((subject, index) => {
        const isEnabled = subject.isOptional ? optionalSubjectsState[index] : true;
        if (isEnabled && (gradesData[index] === undefined || gradesData[index] === null)) {
            allFilled = false;
        }
    });

    if (!allFilled) {
        showNotification('يجب إدخال جميع العلامات للمواد المفعلة', 'error');
        return;
    }
    
    // حساب المجموع المرجح
    let totalWeightedGrades = 0;
    let totalCoefficients = 0;
    
    stream.subjects.forEach((subject, index) => {
        const isEnabled = subject.isOptional ? optionalSubjectsState[index] : true;
        
        if (isEnabled) {
            const grade = gradesData[index];
            const coefficient = subject.coefficient;
            
            totalWeightedGrades += grade * coefficient;
            totalCoefficients += coefficient;
        }
    });
    
    // حساب المعدل
    const average = totalWeightedGrades / totalCoefficients;
    
    // عرض النتائج
    displayResults(totalWeightedGrades, totalCoefficients, average);
    
    // عرض شرح الحساب
    displayExplanation(stream, totalWeightedGrades, totalCoefficients, average);
    
    // إظهار رسالة النجاح
    showNotification('تم حساب المعدل بنجاح!', 'success');
    
    // تمرير سلس إلى النتائج
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * عرض النتائج
 */
function displayResults(totalWeighted, totalCoeff, average) {
    totalPointsDisplay.textContent = totalWeighted.toFixed(2);
    totalCoefficientsDisplay.textContent = totalCoeff;
    finalAverageDisplay.textContent = average.toFixed(2);
    
    resultsSection.style.display = 'block';
}

/**
 * إخفاء النتائج
 */
function hideResults() {
    resultsSection.style.display = 'none';
}

/**
 * عرض شرح الحساب
 */
function displayExplanation(stream, totalWeighted, totalCoeff, average) {
    let html = '';
    
    // إضافة تفاصيل كل مادة
    html += '<div class="detail-item"><div class="detail-label">تفاصيل الحساب:</div></div>';
    
    stream.subjects.forEach((subject, index) => {
        const isEnabled = subject.isOptional ? optionalSubjectsState[index] : true;
        
        if (isEnabled) {
            const grade = gradesData[index];
            const coefficient = subject.coefficient;
            const weighted = grade * coefficient;
            
            html += `
                <div class="detail-item">
                    <div class="detail-label">${subject.name}</div>
                    <div class="detail-value">
                        ${grade.toFixed(2)} × ${coefficient} = ${weighted.toFixed(2)}
                    </div>
                </div>
            `;
        }
    });
    
    // إضافة ملخص الحساب
    html += `
        <div class="detail-item">
            <div class="detail-label">الحساب النهائي:</div>
            <div class="detail-value">
                ${totalWeighted.toFixed(2)} ÷ ${totalCoeff} = ${average.toFixed(2)}
            </div>
        </div>
    `;
    
    explanationDetails.innerHTML = html;
    explanationSection.style.display = 'block';
}

/**
 * إخفاء شرح الحساب
 */
function hideExplanation() {
    explanationSection.style.display = 'none';
}

/**
 * إعادة تعيين النموذج
 */
function resetForm() {
    // مسح جميع حقول الإدخال
    const inputs = document.querySelectorAll('.grade-input');
    inputs.forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('error');
        input.disabled = false;
    });
    
    // مسح البيانات
    gradesData = {};
    optionalSubjectsState = {};
    
    // إخفاء النتائج
    hideResults();
    hideExplanation();
    
    // إعادة تعيين الشعبة
    streamSelect.value = '';
    currentStream = null;
    
    hideGradesSection();
    
    showNotification('تم إعادة تعيين النموذج', 'success');
}

/**
 * عرض إشعار (خطأ أو نجاح)
 */
function showNotification(message, type) {
    if (type === 'error') {
        const errorMsg = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        errorMsg.style.display = 'flex';
        
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 4000);
    } else if (type === 'success') {
        const successMsg = document.getElementById('successMessage');
        const successText = document.getElementById('successText');
        successText.textContent = message;
        successMsg.style.display = 'flex';
        
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 4000);
    }
}

function closeError() {
    document.getElementById('errorMessage').style.display = 'none';
}

function closeSuccess() {
    document.getElementById('successMessage').style.display = 'none';
}

// إضافة أحداث الأزرار
calculateBtn.addEventListener('click', calculateAverage);
resetBtn.addEventListener('click', resetForm);
