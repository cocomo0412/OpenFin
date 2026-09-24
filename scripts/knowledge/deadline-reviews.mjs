// Explicit calendar/law reconciliation. Fixed dates refer to the labelled tax year,
// not to the collection date. Dates must never be mass-replaced during refresh.
const vat='source.law.value-added-tax-act.filing';
const income='source.law.income-tax-act.deductions-credits';
const local='source.law.local-tax-act.rates';
const inheritance='source.law.inheritance-gift-tax-act.rates';
export const deadlineReviews=[
 ['deadline.grant.semiannual.2026','source.law.tax-special-treatment-restriction-act.reliefs',['100의6'],{
  description:'2026년 상반기 근로소득분 반기신청은 2026년 9월 1~15일, 2026년 하반기분은 2027년 3월 1~15일입니다. 법정 근로소득만 있는 신청자가 대상이며 상반기 신청은 하반기 신청도 한 것으로 봅니다. 신청기간과 지급·정산기한은 서로 다릅니다.',
  start_date:'2026-09-01',end_date:'2026-09-15',
  recurrence:{frequency:'semiannual',anchor:'2026년 귀속 근로소득',due_rule:'상반기 2026-09-15; 하반기 2027-03-15',special_rule:'사업소득 등 혼합소득은 정기신청 구분 확인'}
 }],
 ['deadline.vat.periodic',vat,['5','48','49','66','67'],{
  description:'일반과세자는 1~6월분을 7월 25일, 7~12월분을 다음 해 1월 25일까지 확정신고합니다. 예정신고 대상은 1~3월·7~9월 기간 종료 후 25일 이내이며 개인사업자와 법정 법인은 예정고지 대상이 될 수 있습니다. 간이과세는 연간 과세기간·다음 해 1월 확정신고를 원칙으로 하고 예정신고 예외를 구분합니다. 휴일이면 법정 기한 특례를 적용합니다.',
  recurrence:{frequency:'periodic',anchor:'과세유형별 과세·예정신고기간',due_rule:'일반 확정 7월·다음 해 1월 25일, 예정 대상 4월·10월 25일; 간이 원칙 다음 해 1월 25일',special_rule:'예정고지·폐업·유형전환·휴일 조정 별도'}
 }],
 ['deadline.income-tax.2025-return',income,['70','70의2'],{
  description:'2025년 귀속 종합소득세 일반 확정신고는 2026년 5월 1일부터 6월 1일까지입니다. 법정 성실신고확인서 제출자는 6월 30일까지이며 신고기한과 별도 납부연장 대상은 구분합니다.',
  start_date:'2026-05-01',end_date:'2026-06-01',calendar_month:'06',
  recurrence:{frequency:'annual',anchor:'소득 귀속연도의 다음연도',due_rule:'원칙 5월 31일; 성실신고확인서 제출자는 6월 30일; 휴일 특례 적용'}
 }],
 ['deadline.grant.regular.2025-income','source.law.tax-special-treatment-restriction-act.reliefs',['100의6','100의30'],{
  description:'2025년 귀속 근로·자녀장려금 정기신청은 2026년 5월 1일부터 6월 1일까지입니다. 반기신청 및 기한 후 신청과 구분하며 지급일을 신청 마감일로 표시하지 않습니다.',
  start_date:'2026-05-01',end_date:'2026-06-01',calendar_month:'06',
  recurrence:{frequency:'annual',anchor:'소득 귀속연도의 다음연도',due_rule:'종합소득 과세표준 확정신고기간; 휴일 특례 적용'}
 }],
 ['deadline.year-end-settlement',income,['137','135'],{
  description:'근로소득 연말정산은 원칙적으로 다음 연도 2월분 급여를 지급할 때, 퇴직자는 퇴직하는 달 급여를 지급할 때 합니다. 미지급 급여의 원천징수시기 특례와 추가 납부세액 분납을 구분합니다.',
  recurrence:{frequency:'annual',anchor:'해당 과세기간의 다음연도 2월분 근로소득 지급일',due_rule:'2월분 급여 지급 시; 퇴직자는 퇴직월 급여 지급 시',special_rule:'소득세법 제135조 미지급 급여 지급간주 및 추가납부 10만원 초과 분납 규정 확인'}
 }],
 ['deadline.business-registration.application',vat,['8'],{
  description:'사업장마다 사업 개시일부터 20일 이내에 사업자등록을 신청합니다. 사업 개시 전 신청도 가능합니다.',
  recurrence:{frequency:'event-based',anchor:'사업 개시일',due_rule:'사업 개시일부터 20일 이내; 개시 전 신청 가능'}
 }],
 ['deadline.corporate-tax.return','source.law.corporate-tax-act.credits',['60'],{
  description:'내국법인은 사업연도 종료월 말일부터 3개월 이내에 신고합니다. 법정 성실신고확인서를 제출하는 경우에는 4개월이며, 외부감사 미종결에 따른 연장 등은 별도 요건을 적용합니다.',
  recurrence:{frequency:'annual',anchor:'사업연도 종료일이 속하는 달의 말일',due_rule:'원칙 3개월 이내',special_rule:'법정 성실신고확인서 제출 시 4개월; 감사 미종결 연장은 별도 신청 요건'}
 }],
 ['deadline.capital-gains.final',income,['110'],{
  description:'양도소득세 확정신고는 원칙적으로 양도한 연도의 다음 해 5월 1~31일입니다. 예정신고 완료에 따른 생략과 복수 양도 합산 등 예외를 구분합니다.',
  start_date:'2027-05-01',end_date:'2027-05-31',
  recurrence:{frequency:'annual',anchor:'양도한 연도의 다음연도',start_rule:'5월 1일',due_rule:'5월 31일; 휴일 등 기한 특례 별도 적용'}
 }],
 ['deadline.capital-gains.preliminary',income,['105'],{
  description:'법정 부동산 등은 양도월 말일부터 2개월, 국내주식 등은 양도 반기 말일부터 2개월입니다. 부담부증여는 양도월 말일부터 3개월이며 국외주식·파생상품 등에 이 예정신고기한을 그대로 적용하지 않습니다.',
  recurrence:{frequency:'event-based',anchor:'법정 자산의 양도월 또는 양도 반기 말일',due_rule:'부동산 등 월말+2개월, 국내주식 등 반기말+2개월',special_rule:'부담부증여 월말+3개월; 토지거래허가 전 대금청산의 기준일 특례 확인'}
 }],
 ['deadline.gift.general',inheritance,['68'],{
  description:'일반 증여는 증여받은 달의 말일부터 3개월 이내에 신고합니다. 상장·합병 등 이익 및 특수관계법인 관련 증여의제에는 별도 기준일을 적용합니다.',
  recurrence:{frequency:'event-based',anchor:'증여받은 날이 속하는 달의 말일',due_rule:'3개월 이내',special_rule:'상장·합병·특수관계법인 관련 증여의제의 기준일은 별도'}
 }],
 ['deadline.inheritance.resident',inheritance,['67'],{
  description:'상속세의 일반 신고기한은 상속개시월 말일부터 6개월입니다. 피상속인이나 상속인이 외국에 주소를 둔 경우의 9개월 특례 및 유언집행자 등의 기준일 특례를 구분합니다.',
  recurrence:{frequency:'event-based',anchor:'상속개시일이 속하는 달의 말일',due_rule:'원칙 6개월 이내',special_rule:'피상속인이나 상속인의 외국 주소 및 유언집행자 등의 법정 특례 확인'}
 }],
 ['deadline.inheritance.nonresident',inheritance,['67'],{
  title:'상속세 외국 주소 관련 신고기한 특례',
  description:'상속세 및 증여세법 제67조 제4항은 피상속인이나 상속인이 외국에 주소를 둔 경우 신고기간을 9개월로 정합니다. 국적만으로 판단하거나 상속인 전원이 외국에 거주해야 한다고 일괄 설명하지 않습니다.',
  recurrence:{frequency:'event-based',anchor:'상속개시일이 속하는 달의 말일',due_rule:'피상속인이나 상속인이 외국에 주소를 둔 경우 9개월',special_rule:'유언집행자·상속재산관리인은 제67조 제3항의 기준일 특례 확인'}
 }],
 ['deadline.local.acquisition',local,['20'],{
  description:'취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다.',
  recurrence:{frequency:'event-based',anchor:'취득일 또는 법정 기준월 말일',due_rule:'일반 취득 60일 이내',special_rule:'무상취득·부담부증여 월말+3개월, 상속·실종 월말+6개월(외국 주소 상속인 9개월); 기한 전 등기·등록 시 접수일까지, 토지거래허가 특례 별도'}
 }],
 ['deadline.local.automobile',local,['128'],{
  description:'자동차세 소유분의 일반 납기는 6월 16~30일과 12월 16~31일입니다. 연납·분납·수시부과 및 소액 연세액의 일괄 부과는 별도 규정에 따릅니다.',
  recurrence:{frequency:'semiannual',anchor:'자동차 소유기간',due_rule:'제1기 6월 16~30일, 제2기 12월 16~31일',special_rule:'연납·분납·수시부과 등 별도 규정 적용'}
 }],
 ['deadline.local.income.final',local,['95'],{
  description:'개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다.',
  end_date:'2026-06-01',calendar_month:'06',
  recurrence:{frequency:'annual',anchor:'과세기간 다음연도',start_rule:'5월 1일',due_rule:'소득세법상 확정신고기한까지',special_rule:'성실신고확인서 제출자는 6월 30일; 납부세액 100만원 초과 시 법정 분납 요건 확인'}
 }],
 ['deadline.local.property.first',local,['115'],{
  description:'재산세의 주택분 절반과 건축물·선박·항공기분의 납기는 7월 16~31일입니다. 주택 세액 20만원 이하는 조례에 따라 7월에 전액 부과할 수 있습니다.',
  recurrence:{frequency:'annual',anchor:'과세기준일 6월 1일',start_rule:'7월 16일',due_rule:'7월 31일',special_rule:'주택 세액 20만원 이하 조례상 7월 전액 부과 가능'}
 }],
 ['deadline.local.property.second',local,['115'],{
  description:'토지분과 주택분 나머지 절반의 재산세 납기는 9월 16~30일입니다. 주택 소액 세액을 조례에 따라 7월에 전액 부과한 경우는 구분합니다.',
  recurrence:{frequency:'annual',anchor:'과세기준일 6월 1일',start_rule:'9월 16일',due_rule:'9월 30일'}
 }],
 ['deadline.local.resident',local,['79','83'],{
  description:'주민세 개인분은 8월 16~31일 납부하고, 사업소분은 8월 1~31일 신고·납부합니다. 두 유형의 시작일이 다릅니다.',
  recurrence:{frequency:'annual',anchor:'과세기준일 7월 1일',due_rule:'개인분 8월 16~31일; 사업소분 8월 1~31일'}
 }],
 ['deadline.vat.general.first-final',vat,['5','49'],{
  description:'일반과세자의 1기(1~6월) 확정신고는 원칙 7월 25일까지입니다. 2026년은 7월 25일이 토요일이므로 국세청 세무일정상 7월 27일까지입니다.',
  end_date:'2026-07-27',calendar_month:'07',
  recurrence:{frequency:'annual',anchor:'일반과세자 제1기 과세기간',start_rule:'7월 1일',due_rule:'7월 25일; 휴일 등 기한 특례 적용',example:'2026년 1기 확정신고: 2026년 7월 27일'}
 }],
 ['deadline.vat.general.second-final',vat,['5','49'],{
  description:'일반과세자의 2기(7~12월) 확정신고는 원칙적으로 다음 해 1월 25일까지입니다. 폐업 등 별도 과세기간과 기한은 구분합니다.',
  recurrence:{frequency:'annual',anchor:'일반과세자 제2기 과세기간',start_rule:'다음 해 1월 1일',due_rule:'다음 해 1월 25일; 휴일 등 기한 특례 적용'}
 }],
 ['deadline.vat.simplified.annual',vat,['5','67'],{
  description:'간이과세자의 일반 과세기간은 1~12월이며 확정신고는 다음 해 1월 25일까지입니다. 폐업·과세유형 전환·간이과세 포기에는 별도 과세기간을 적용합니다.',
  recurrence:{frequency:'annual',anchor:'간이과세자 일반 연간 과세기간',start_rule:'다음 해 1월 1일',due_rule:'다음 해 1월 25일; 휴일 등 기한 특례 적용'}
 }],
 ['deadline.vat.simplified.preliminary',vat,['66'],{
  description:'예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다.',
  end_date:'2026-07-27',calendar_month:'07',
  recurrence:{frequency:'annual',anchor:'1월 1일~6월 30일 예정부과기간',start_rule:'7월 1일',due_rule:'기간 종료 후 25일; 휴일 등 기한 특례 적용',special_rule:'부가가치세법 제32조 또는 제36조 제3항에 따라 예정부과기간에 세금계산서를 발급한 간이과세자'}
 }],
 ['deadline.comprehensive-real-estate.payment','source.law.comprehensive-real-estate-act.full',['16'],{
  description:'종합부동산세는 해당 연도 12월 1일부터 15일까지 납부합니다. 고지에 따른 납부 대신 신고납부를 선택하는 경우도 같은 기간에 신고하고 기한까지 납부합니다. 휴일 등 법정 기한 특례와 분납 요건은 별도 확인합니다.',
  start_date:'2026-12-01',end_date:'2026-12-15',
  recurrence:{frequency:'annual',anchor:'해당 연도 종합부동산세',start_rule:'12월 1일',due_rule:'12월 15일; 휴일 등 기한 특례 적용'}
 }],
 ['deadline.withholding.monthly',income,['128'],{
  description:'원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다.',
  calendar_month:'05',
  recurrence:{frequency:'monthly',anchor:'원천징수일이 속하는 달',due_rule:'다음 달 10일; 휴일 등 기한 특례 적용',example:'2026년 4월분 원천세: 2026년 5월 11일'}
 }],
 ['deadline.withholding.semiannual',income,['128'],{
  description:'법정 반기납부 대상 원천징수의무자는 반기 마지막 달의 다음 달 10일까지 납부할 수 있습니다. 소득처분 상여·배당 등 제128조 제2항의 제외 세액에는 적용하지 않습니다.',
  recurrence:{frequency:'semiannual',anchor:'원천징수일이 속하는 반기',due_rule:'반기 마지막 달의 다음 달 10일; 휴일 등 기한 특례 적용',special_rule:'법정 자격·절차 및 반기납부 제외 원천징수세액 확인'}
 }]
];
