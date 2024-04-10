// Dear whoever is reading this,
// I thought this was a very genius idea until
// I remembered that the icons will change upon hover
// and redirection.. 🥲🥲
// 
// If you know how to bring this stroke of genius
// back to life, please do so

// EDIT: We are sooo back 😈😈😈

import React from "react"
import '../css/NavBar.css';

export function UsernameIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5 25.5C28.2575 25.5 30.5 23.2575 30.5 20.5C30.5 17.7425 28.2575 15.5 25.5 15.5C22.7425 15.5 20.5 17.7425 20.5 20.5C20.5 23.2575 22.7425 25.5 25.5 25.5ZM20.8025 26.3412C19.095 24.9675 18 22.8625 18 20.5C18 16.3575 21.3575 13 25.5 13C29.6425 13 33 16.3575 33 20.5C33 22.8625 31.905 24.9675 30.1975 26.3412C34.7712 28.06 38 32.3062 38 38H35.5C35.5 31.75 31.0137 28 25.5 28C19.9862 28 15.5 31.75 15.5 38H13C13 32.3062 16.2288 28.06 20.8025 26.3412Z" fill="#0F1F3C"/>
            <path d="M0 2C0 0.89543 0.895431 0 2 0H51V51H2C0.89543 51 0 50.1046 0 49V2Z" fill="black" fill-opacity="0.07"/>
        </svg>
    )
}

export function PasswordIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
            <path d="M0 2C0 0.89543 0.895431 0 2 0H51V51H2C0.89543 51 0 50.1046 0 49V2Z" fill="black" fill-opacity="0.07"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7291 24.4167V21.2917C18.7291 19.4959 19.4425 17.7737 20.7123 16.504C21.9821 15.2342 23.7042 14.5208 25.5 14.5208C27.2957 14.5208 29.0179 15.2342 30.2877 16.504C31.5575 17.7737 32.2708 19.4959 32.2708 21.2917V24.4167H32.7916C34.5176 24.4167 35.9166 25.8157 35.9166 27.5417V34.8333C35.9166 36.5593 34.5176 37.9583 32.7916 37.9583H18.2083C16.4824 37.9583 15.0833 36.5593 15.0833 34.8333V27.5417C15.0833 25.8157 16.4824 24.4167 18.2083 24.4167H18.7291ZM22.922 18.7137C23.6057 18.0299 24.533 17.6458 25.5 17.6458C26.467 17.6458 27.3942 18.0299 28.078 18.7137C28.7617 19.3974 29.1458 20.3247 29.1458 21.2917V24.4167H21.8541V21.2917C21.8541 20.3247 22.2383 19.3974 22.922 18.7137Z" fill="#0F1F3C"/>
        </svg>
    )
}

export function ProfileIcon() {
    return(
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="inactive" fill-rule="evenodd" clip-rule="evenodd" d="M14 14C17.0884 14 19.6 11.4884 19.6 8.4C19.6 5.3116 17.0884 2.8 14 2.8C10.9116 2.8 8.4 5.3116 8.4 8.4C8.4 11.4884 10.9116 14 14 14ZM8.73881 14.9422C6.82641 13.4036 5.6 11.046 5.6 8.4C5.6 3.7604 9.3604 0 14 0C18.6396 0 22.4 3.7604 22.4 8.4C22.4 11.046 21.1736 13.4036 19.2612 14.9422C24.3838 16.8672 28 21.623 28 28H25.2C25.2 21 20.1754 16.8 14 16.8C7.8246 16.8 2.8 21 2.8 28H0C0 21.623 3.61621 16.8672 8.73881 14.9422Z" fill="white"/>

    <path className="activated" d="M1.12175 27.9996H26.8795C27.0448 28.0021 27.2088 27.967 27.3603 27.8967C27.5118 27.8265 27.6473 27.7226 27.7578 27.5922C27.8473 27.4863 27.9145 27.3615 27.9552 27.2261C27.9959 27.0907 28.0091 26.9477 27.9939 26.8065C27.7038 24.4142 26.8743 22.1312 25.5757 20.1508C24.2771 18.1703 22.5475 17.619 20.5334 16.4972C19.6765 17.4087 18.6584 18.1319 17.5374 18.6254C16.4163 19.1189 15.2144 19.3729 14.0006 19.3729C12.7868 19.3729 11.5849 19.1189 10.4638 18.6254C9.3428 18.1319 8.32467 17.4087 7.46785 16.4972C5.45373 17.619 3.72417 18.1703 2.42554 20.1508C1.12691 22.1312 0.297444 24.4142 0.00733708 26.8065C-0.00954363 26.9505 0.002784 27.0966 0.0434948 27.2351C0.0842057 27.3736 0.15236 27.5013 0.243394 27.6096C0.355375 27.7369 0.491596 27.8375 0.643027 27.9047C0.794457 27.9719 0.957637 28.0043 1.12175 27.9996Z" fill="white"/>
    <path className="activated" d="M8.19799 14.3522C8.34621 14.521 8.50541 14.6781 8.66461 14.8294C10.1284 16.2265 12.0283 16.9995 13.9979 16.9995C15.9675 16.9995 17.8673 16.2265 19.3311 14.8294C19.4964 14.6794 19.654 14.5201 19.8032 14.3522C19.9515 14.1834 20.0997 14.0147 20.2369 13.8343C21.1872 12.5864 21.7849 11.079 21.9611 9.48613C22.1372 7.8933 21.8845 6.28015 21.2322 4.83315C20.58 3.38616 19.5547 2.16441 18.275 1.30914C16.9953 0.453869 15.5134 0 14.0006 0C12.4878 0 11.0059 0.453869 9.72623 1.30914C8.44652 2.16441 7.42127 3.38616 6.76898 4.83315C6.11669 6.28015 5.86401 7.8933 6.04014 9.48613C6.21627 11.079 6.81402 12.5864 7.7643 13.8343C7.90154 14.003 8.04976 14.1834 8.19799 14.3522Z" fill="white"/>

    </svg>
    )
}

export function ViewExpensesIcon() {
    return(
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="inactive" d="M21.894 0.534517C21.524 0.190945 21.0378 0 20.5329 0H11.9497C11.0029 0 10.2353 0.767568 10.2353 1.71441V2.57588C10.2353 3.04695 10.6172 3.42882 11.0882 3.42882C11.5593 3.42882 11.9412 3.04271 11.9412 2.57164C11.9412 2.09586 12.3269 1.70588 12.8026 1.70588H18.4706C19.5752 1.70588 20.4706 2.60131 20.4706 3.70588V6.52941C20.4706 7.63398 21.366 8.52941 22.4706 8.52941H25.2941C26.3987 8.52941 27.2941 9.42484 27.2941 10.5294V20.1765C27.2941 21.281 26.3987 22.1765 25.2941 22.1765H21.2945C20.8235 22.1765 20.4416 22.5583 20.4416 23.0294C20.4416 23.5005 20.8235 23.8824 21.2945 23.8824H27C28.1046 23.8824 29 22.9869 29 21.8824V8.00605C29 7.44996 28.7685 6.91898 28.361 6.54057L21.894 0.534517ZM22.1765 4.27171C22.1765 3.83514 22.6967 3.60824 23.0167 3.90529L25.2266 5.95712C25.5596 6.26633 25.3408 6.82353 24.8863 6.82353H22.6765C22.4003 6.82353 22.1765 6.59967 22.1765 6.32353V4.27171ZM2 5.11765C0.895428 5.11765 0 6.01308 0 7.11765V27C0 28.1046 0.895431 29 2 29H16.7647C17.8693 29 18.7647 28.1046 18.7647 27V13.1237C18.7647 12.5676 18.5332 12.0366 18.1257 11.6582L11.6587 5.65216C11.2887 5.30859 10.8025 5.11765 10.2976 5.11765H2ZM11.9412 9.38935C11.9412 8.95278 12.4615 8.72589 12.7814 9.02294L14.9913 11.0748C15.3243 11.384 15.1055 11.9412 14.6511 11.9412H12.4412C12.165 11.9412 11.9412 11.7173 11.9412 11.4412V9.38935ZM3.70588 27.2941C2.60131 27.2941 1.70588 26.3987 1.70588 25.2941V8.82353C1.70588 7.71896 2.60131 6.82353 3.70588 6.82353H8.2353C9.33986 6.82353 10.2353 7.71896 10.2353 8.82353V11.6471C10.2353 12.7516 11.1307 13.6471 12.2353 13.6471H15.0588C16.1634 13.6471 17.0588 14.5425 17.0588 15.6471V25.2941C17.0588 26.3987 16.1634 27.2941 15.0588 27.2941H3.70588Z" fill="white"/>
        <path className="activated" d="M21.894 0.534517C21.524 0.190945 21.0378 0 20.5329 0H11.9497C11.0029 0 10.2353 0.767568 10.2353 1.71441V2.19337C10.2353 2.87569 10.7884 3.42882 11.4707 3.42882C11.7738 3.42882 12.0662 3.54018 12.2925 3.74171L19.7718 10.4034C20.1979 10.7829 20.4416 11.3264 20.4416 11.8969V22.1765C20.4416 23.1186 21.2053 23.8824 22.1475 23.8824H27C28.1046 23.8824 29 22.9869 29 21.8824V8.00605C29 7.44996 28.7685 6.91898 28.361 6.54057L21.894 0.534517ZM22.1765 4.27171C22.1765 3.83514 22.6967 3.60824 23.0167 3.90529L25.2266 5.95712C25.5596 6.26633 25.3408 6.82353 24.8863 6.82353H22.6765C22.4003 6.82353 22.1765 6.59967 22.1765 6.32353V4.27171ZM2 5.11765C0.895428 5.11765 0 6.01308 0 7.11765V27C0 28.1046 0.895431 29 2 29H16.7647C17.8693 29 18.7647 28.1046 18.7647 27V13.1237C18.7647 12.5676 18.5332 12.0366 18.1257 11.6582L11.6587 5.65216C11.2887 5.30859 10.8025 5.11765 10.2976 5.11765H2ZM11.9412 9.38935C11.9412 8.95278 12.4615 8.72589 12.7814 9.02294L14.9913 11.0748C15.3243 11.384 15.1055 11.9412 14.6511 11.9412H12.4412C12.165 11.9412 11.9412 11.7173 11.9412 11.4412V9.38935Z" fill="white"/>
    </svg>
    )
}

export function CreateExpenseIcon() {
    return(
    <svg id="createExpenses" width="82" height="59" viewBox="0 0 82 59" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="inactive" filter="url(#filter0_d_12_20)">
            <rect x="4" y="0.433716" width="74" height="50.1325" rx="20" fill="#0F1F3C"/>
            <path d="M30.747 25.9397H40.5542M40.5542 25.9397H50.3614M40.5542 25.9397V35.6144M40.5542 25.9397V16.265" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs className="inactive">
            <filter id="filter0_d_12_20" x="0" y="0.433716" width="82" height="58.1325" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.920833 0 0 0 0 0.920833 0 0 0 0 0.920833 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_20"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_20" result="shape"/>
            </filter>
        </defs>


        <g className="activated" filter="url(#filter0_d_34_36)">
            <rect x="4" y="0.433716" width="74" height="50.1325" rx="20" fill="#F2F1F1"/>
            <rect width="39.2289" height="38.6988" transform="translate(20.9398 6.59033)" fill="#F2F1F1"/>
            <path d="M30.747 25.9397H40.5542M40.5542 25.9397H50.3615M40.5542 25.9397V35.6144M40.5542 25.9397V16.265" stroke="#0F1F3C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs className="activated">
            <filter id="filter0_d_34_36" x="0" y="0.433716" width="82" height="58.1325" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 1 0 0 0 0 0.956 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_34_36"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_34_36" result="shape"/>
            </filter>
        </defs>
    </svg>
    )
}

export function CollapseIcon() {
    return (
        <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.137513 1.91465L1.69962 0.352538L7.54845 6.19834L13.3943 0.352539L14.9564 1.91465L7.54845 9.32256L0.137513 1.91465Z" fill="black"/>
        </svg>
    )
}

export function ArrowRightIcon() {
    return (
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.8285 54.575L27.0996 50.8461L41.0541 36.8844L27.0996 22.9299L30.8285 19.201L48.5119 36.8844L30.8285 54.575Z" fill="#0F1F3C"/>
        </svg>
    )
}

export function BackButtonIcon() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0031 12.6L30.4219 15.0188L21.3703 24.075L30.4219 33.1266L28.0031 35.5453L16.5328 24.075L28.0031 12.6Z" fill="#0F1F3C"/>
        </svg>
    )
}

export function PendingIcon() {
    return (
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.9928 13.2246C23.8549 13.2246 13.2101 23.8766 13.2101 37.0072C13.2101 50.1379 23.8621 60.7898 36.9928 60.7898C50.1306 60.7898 60.7754 50.1379 60.7754 37.0072C60.7754 23.8766 50.1234 13.2246 36.9928 13.2246ZM36.9928 55.5145C26.7889 55.5145 18.4928 47.2184 18.4928 37.0145C18.4928 26.8105 26.7889 18.5145 36.9928 18.5145C47.1967 18.5145 55.4928 26.8105 55.4928 37.0145C55.4928 47.2184 47.1894 55.5145 36.9928 55.5145Z" fill="#bebbbb"/>
            <path d="M39.6449 26.4276H34.3551V38.0912L43.0631 46.7992L46.7992 43.0631L39.6449 35.9088V26.4276Z" fill="#bebbbb"/>
        </svg>
    )
}

export function RejectedIcon() {
    return (
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.9928 13.2246C23.8549 13.2246 13.2101 23.8766 13.2101 37.0072C13.2101 50.1379 23.8621 60.7898 36.9928 60.7898C50.1234 60.7898 60.7754 50.1451 60.7754 37.0145C60.7754 23.8838 50.1234 13.2246 36.9928 13.2246ZM36.9928 55.5145C26.7889 55.5145 18.4928 47.2184 18.4928 37.0145C18.4928 26.8105 26.7889 18.5145 36.9928 18.5145C47.1967 18.5145 55.4928 26.8105 55.4928 37.0145C55.4928 47.2184 47.1894 55.5145 36.9928 55.5145Z" fill="#ee6352"/>
            <path d="M43.0559 27.208L36.9928 33.2711L30.9297 27.208L27.1863 30.9441L33.2494 37.0145L27.1863 43.0775L30.9297 46.8137L36.9928 40.7506L43.0559 46.8137L46.792 43.0775L40.7289 37.0145L46.792 30.9441L43.0559 27.208Z" fill="#ee6352"/>
        </svg>
    )
}

export function AcceptedIcon() {
    return (
        <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.9928 13.2318C23.8549 13.2318 13.2101 23.8838 13.2101 37.0145C13.2101 50.1523 23.8621 60.7971 36.9928 60.7971C50.1234 60.7971 60.7754 50.1523 60.7754 37.0145C60.7754 23.8766 50.1234 13.2318 36.9928 13.2318ZM36.9928 55.5145C26.7889 55.5145 18.4928 47.2184 18.4928 37.0145C18.4928 26.8105 26.7889 18.5145 36.9928 18.5145C47.1967 18.5145 55.4928 26.8105 55.4928 37.0145C55.4928 47.2184 47.1894 55.5145 36.9928 55.5145Z" fill="#59cd90"/>
            <path d="M35.2223 40.2375L28.1547 33.907L24.6281 37.8383L35.692 47.7531L49.5814 31.768L45.5924 28.2992L35.2223 40.2375Z" fill="#59cd90"/>
        </svg>
    )
}

export function FilterIcon() {
    return (
        <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.53638H12.2727" stroke="#0C0310" stroke-width="2" stroke-linecap="round"/>
            <path d="M19.0364 3.53638H23.5455" stroke="#0C0310" stroke-width="2" stroke-linecap="round"/>
            <path d="M1 13.6818H5.50909" stroke="#0C0310" stroke-width="2" stroke-linecap="round"/>
            <path d="M13.4 13.6818L23.5454 13.6818" stroke="#0C0310" stroke-width="2" stroke-linecap="round"/>
            <path d="M15.0909 6.63636C16.6473 6.63636 17.9091 5.37462 17.9091 3.81818C17.9091 2.26174 16.6473 1 15.0909 1C13.5345 1 12.2727 2.26174 12.2727 3.81818C12.2727 5.37462 13.5345 6.63636 15.0909 6.63636Z" stroke="#0C0310" stroke-width="2" stroke-linecap="round"/>
            <path d="M9.45455 16.5C11.011 16.5 12.2727 15.2383 12.2727 13.6818C12.2727 12.1254 11.011 10.8636 9.45455 10.8636C7.89811 10.8636 6.63637 12.1254 6.63637 13.6818C6.63637 15.2383 7.89811 16.5 9.45455 16.5Z" stroke="#0C0310" stroke-width="2" stroke-linecap="round"/>
        </svg>
    )
}

export function CloseIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 50 50" className="close-icon" {...props}> 
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
        </svg>
    )
}

export function DraftIcon() {
    return (
        <svg width="74" height="74" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-text-paragraph">
        <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
        </svg>
    )
}

export function ArrowUpIcon({ onClick }) {
    return (
        <svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g data-name="Layer 2">
                    <g data-name="arrow-ios-upward">
                        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect>
                        <path
                            d="M18 15a1 1 0 0 1-.64-.23L12 10.29l-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.41l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .13 1.41A1 1 0 0 1 18 15z"></path>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export function ArrowDownIcon({onClick}) {
    return (
        <svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g data-name="Layer 2">
                    <g data-name="arrow-ios-downward">
                        <rect width="24" height="24" opacity="0"></rect>
                        <path
                            d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z"></path>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export function AccountNavIcon(props) {
    return (
        <svg
            viewBox="0 0 31 31"
            fill="none"
            width="31"
            height="31"
            {...props}
        >
            <path className="notClickedIcon" d="M15.3291 16.7288C15.4288 16.7138 15.5569 16.7138 15.6708 16.7288C18.1764 16.6388 20.1694 14.4776 20.1694 11.8211C20.1694 9.10455 18.0909 6.89832 15.4999 6.89832C12.9232 6.89832 10.8304 9.10455 10.8304 11.8211C10.8447 14.4776 12.8235 16.6388 15.3291 16.7288Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className="notClickedIcon" d="M6 26.4082C8.5089 28.6428 11.8353 30 15.5 30C19.1647 30 22.4911 28.6428 25 26.4082C24.8591 25.1196 24.0134 23.8583 22.5052 22.8713C18.6432 20.3762 12.3286 20.3762 8.4948 22.8713C6.98664 23.8583 6.14095 25.1196 6 26.4082Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className="notClickedIcon" d="M15.5 30C7.49194 30 0.999999 23.5081 0.999999 15.5C0.999999 7.49187 7.49194 1 15.5 1C23.5081 1 30 7.49187 30 15.5C30 23.5081 23.5081 30 15.5 30Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

            <path className="ClickedIcon activated" d="M15.3291 16.7288C15.4288 16.7138 15.5569 16.7138 15.6708 16.7288C18.1764 16.6388 20.1694 14.4776 20.1694 11.8211C20.1694 9.10455 18.0909 6.89832 15.4999 6.89832C12.9232 6.89832 10.8304 9.10455 10.8304 11.8211C10.8447 14.4776 12.8235 16.6388 15.3291 16.7288Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className="ClickedIcon activated" d="M6 26.4082C8.5089 28.6428 11.8353 30 15.5 30C19.1647 30 22.4911 28.6428 25 26.4082C24.8591 25.1196 24.0134 23.8583 22.5052 22.8713C18.6432 20.3762 12.3286 20.3762 8.4948 22.8713C6.98664 23.8583 6.14095 25.1196 6 26.4082Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className="ClickedIcon activated" d="M15.5 30C7.49194 30 0.999999 23.5081 0.999999 15.5C0.999999 7.49187 7.49194 1 15.5 1C23.5081 1 30 7.49187 30 15.5C30 23.5081 23.5081 30 15.5 30Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}