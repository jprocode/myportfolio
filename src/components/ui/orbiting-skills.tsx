"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType =
    | 'java' | 'python' | 'typescript' | 'javascript' | 'c' | 'sql'
    | 'spring' | 'react' | 'nextjs' | 'fastapi' | 'nodejs' | 'html' | 'css'
    | 'postgres' | 'redis' | 'supabase' | 'mongodb'
    | 'docker' | 'git' | 'aws' | 'vercel' | 'render';

type GlowColor = 'cyan' | 'purple' | 'green' | 'yellow';

interface SkillIconProps {
    type: IconType;
}

interface SkillConfig {
    id: string;
    orbitRadius: number;
    size: number;
    speed: number;
    iconType: IconType;
    phaseShift: number;
    glowColor: GlowColor;
    label: string;
}

interface OrbitingSkillProps {
    config: SkillConfig;
    angle: number;
}

interface GlowingOrbitPathProps {
    radius: number;
    glowColor?: GlowColor;
    animationDelay?: number;
}

// --- SVG Icon Components for all technologies ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
    java: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.154 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#E76F00" />
            </svg>
        ),
        color: '#E76F00'
    },
    python: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01H8.16v-.05H6.18l-.01-2.75L6.19.93l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01H14.25zM9.4 11.01l-1.4.93-.4.6-.1.67.17.69.48.54.73.28.88-.07.87-.36.74-.58.5-.73.2-.77-.1-.74-.36-.6-.62-.38-.81-.11-.91.21z" fill="#3776AB" />
                <path d="M9.77 5.43c.27 0 .5-.23.5-.5s-.23-.5-.5-.5-.5.22-.5.5.23.5.5.5z" fill="#FFD43B" />
            </svg>
        ),
        color: '#3776AB'
    },
    typescript: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <rect width="24" height="24" fill="#3178C6" rx="2" />
                <path d="M13.5 14.5v-1.5h-4v1.5h1.25v6h1.5v-6h1.25zM15.5 13h4l-2 2.5 2 2.5h-1.5l-1.25-1.5-1.25 1.5H14l2-2.5-2-2.5h1.5z" fill="white" />
            </svg>
        ),
        color: '#3178C6'
    },
    javascript: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <rect width="24" height="24" fill="#F7DF1E" rx="2" />
                <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65z" fill="#323330" />
            </svg>
        ),
        color: '#F7DF1E'
    },
    c: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11z" fill="#A8B9CC" />
            </svg>
        ),
        color: '#A8B9CC'
    },
    sql: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 9.08c1.42.79 3.55 1.42 6 1.42s4.58-.63 6-1.42V12c0 .5-2.13 2-6 2s-6-1.5-6-2V9.08zM6 14.08c1.42.79 3.55 1.42 6 1.42s4.58-.63 6-1.42V17c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.92z" fill="#336791" />
            </svg>
        ),
        color: '#336791'
    },
    spring: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M21.8 15.4C22.6 13.1 23 10.6 22.9 8c-2.2.6-4.2 1.6-5.9 3.1.4.8.7 1.6.9 2.5 1.4-.5 2.8-.8 4.3-.8-.1.9-.2 1.8-.4 2.6zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5.8 17.2c-1.4 1-3.2 1.6-5.1 1.6-2.5 0-4.8-1.1-6.4-2.8.6-.6 1.3-1.1 2-1.5 1.3 1.4 3.1 2.2 5 2.2.6 0 1.1-.1 1.6-.2-.2.9-.6 1.8-1.1 2.7zm-11-3.1c-.8.5-1.6 1-2.3 1.7-1.4-1.7-2.3-3.9-2.3-6.3 0-1.5.3-2.9.9-4.2 1.1.4 2.1 1 3 1.7-.4 1.1-.6 2.3-.6 3.5 0 1.2.2 2.3.6 3.4-.6-.3-1.2-.5-1.8-.6.2.7.5 1.3.8 1.9.5-.1 1-.1 1.5-.1.7 0 1.4.1 2.1.2-.5.4-1 .8-1.5 1.2.1-.5.3-1 .5-1.4h-.9zm4.4-2.9c-.1-.2-.1-.4-.1-.6 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8c-.6 0-1.2-.3-1.5-.8-.1-.1-.2-.3-.2-.4z" fill="#6DB33F" />
            </svg>
        ),
        color: '#6DB33F'
    },
    react: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <g stroke="#61DAFB" strokeWidth="1" fill="none">
                    <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
                </g>
            </svg>
        ),
        color: '#61DAFB'
    },
    nextjs: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" fill="currentColor" />
            </svg>
        ),
        color: '#000000'
    },
    fastapi: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" fill="#009688" />
            </svg>
        ),
        color: '#009688'
    },
    nodejs: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247z" fill="#339933" />
            </svg>
        ),
        color: '#339933'
    },
    html: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26" />
            </svg>
        ),
        color: '#E34F26'
    },
    css: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6" />
            </svg>
        ),
        color: '#1572B6'
    },
    postgres: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M23.556 14.047c-.205-.607-.662-.86-1.32-.732-.43.088-.823.207-1.206.228-.757.043-1.263-.332-1.503-1.067-.165-.498-.267-1.02-.353-1.536-.169-1.004-.32-2.01-.466-3.018-.156-1.07-.302-2.143-.448-3.215-.086-.633-.17-1.267-.245-1.901-.03-.254-.074-.502-.161-.742-.272-.75-.863-1.101-1.67-1.003-.547.066-1.044.266-1.508.547-.928.558-1.742 1.254-2.474 2.047-.193.21-.39.42-.59.625-.073.074-.167.128-.3.228-.034-.273-.066-.493-.087-.714-.056-.558-.205-1.087-.47-1.576-.412-.756-1.103-1.097-1.95-1.065-.667.026-1.29.218-1.894.477-.88.378-1.655.914-2.37 1.535-.556.48-1.07 1-1.533 1.569-.113.14-.18.317-.255.482-.093.206-.063.39.135.516.119.075.262.116.4.153.546.148 1.1.263 1.64.43.36.112.699.046 1.036-.068.47-.158.925-.351 1.399-.497.392-.12.793-.198 1.215-.149.626.074 1 .46 1.098 1.153.028.198.043.398.048.599.02.82-.053 1.636-.148 2.45-.205 1.771-.44 3.538-.665 5.306-.066.526-.126 1.054-.195 1.58-.052.397-.118.793-.17 1.19-.033.248.028.478.175.684.24.338.585.472.976.497.498.031.963-.104 1.415-.299.746-.322 1.43-.75 2.067-1.248.89-.697 1.717-1.461 2.448-2.328.21-.25.413-.508.6-.775.073-.103.104-.233.15-.353.02-.053.026-.112.037-.163l.01-.004c.121.358.185.75.384 1.065.528.832 1.345 1.196 2.295 1.246.595.031 1.183-.062 1.76-.2.795-.192 1.426-.607 1.874-1.283.264-.398.474-.827.701-1.247.128-.234.26-.468.354-.715.12-.318.062-.501-.238-.666-.154-.084-.333-.13-.504-.18-.413-.121-.832-.223-1.244-.348-.212-.065-.412-.17-.612-.265-.12-.058-.145-.16-.093-.295.108-.275.204-.558.322-.83.137-.315.285-.625.44-.932.28-.557.51-1.133.628-1.75.063-.33.12-.665.08-1.007-.05-.44-.296-.706-.73-.79-.27-.052-.554-.051-.83-.013-.68.093-1.302.353-1.87.736-.398.268-.758.583-1.095.924-.088.09-.16.196-.26.32-.034-.183-.06-.34-.092-.496-.166-.808-.513-1.528-1.05-2.14-.106-.122-.22-.238-.344-.34-.077-.063-.098-.107-.037-.197.223-.329.423-.674.661-.989.626-.823 1.306-1.597 2.088-2.275.372-.324.771-.612 1.202-.848.307-.168.637-.296.975-.389.473-.13.904-.038 1.277.27.25.206.437.46.565.752.278.64.414 1.316.495 2.004.05.423.074.85.093 1.275.03.694.033 1.39.058 2.084.02.571.058 1.141.095 1.71.045.68.1 1.36.151 2.04.037.493.073.986.11 1.479.037.494.073.988.111 1.481.027.34.055.679.081 1.019.016.207.028.416.051.621.057.528.134 1.052.283 1.56.077.265.173.523.318.758.333.542.848.772 1.459.744.32-.015.631-.086.92-.219.713-.326 1.196-.872 1.48-1.596.158-.401.248-.825.3-1.253.07-.588.068-1.18.047-1.77-.038-1.081-.127-2.157-.212-3.233-.073-.923-.167-1.844-.244-2.768-.03-.356-.042-.713-.05-1.07-.008-.348.068-.394.377-.275.147.057.29.122.435.185.573.249 1.067.618 1.524 1.037.285.262.552.544.829.815.107.104.212.212.328.305.158.127.336.166.526.1.164-.057.26-.18.32-.338.067-.178.129-.359.175-.544.157-.636.102-1.271-.076-1.897z" fill="#336791" />
            </svg>
        ),
        color: '#336791'
    },
    redis: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.163 2.623-.239-1.676-.64.622-1.058-1.837.576zm8.274 5.678c-1.156-.536-7.145-2.995-8.477-3.565-.616-.263-1.396-.627-2.117-.323-.613.26-6.296 2.476-7.473 2.96-.588.243-.98.545-.98 1.078v4.122c0 .553.11.884.664 1.13 1.176.52 6.787 2.785 7.887 3.2.55.207 1.02.155 1.523-.102.503-.257 6.636-2.997 7.845-3.555.624-.287.883-.57.883-1.146V7.978c0-.566-.32-.848-1.755-.64z" fill="#DC382D" />
            </svg>
        ),
        color: '#DC382D'
    },
    supabase: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C0 12.97.536 14.307 1.69 14.478l5.63.86V23.5c0 1.004 1.283 1.426 1.89.621L23.198 12.01c.777-.878.262-2.234-.88-2.426l-5.63-.86V1.036c0-.562-.55-.96-1.1-.792l-4.689 1.435V1.036zm-.96 10.2l-5.296-.81L12.06 3.26l-.01 7.98-1.11-.004zm2.11 2.34l5.296.81-6.416 7.165.01-7.98 1.11.005z" fill="#3ECF8E" />
            </svg>
        ),
        color: '#3ECF8E'
    },
    mongodb: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z" fill="#47A248" />
            </svg>
        ),
        color: '#47A248'
    },
    docker: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.186.186 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.186.186 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" fill="#2496ED" />
            </svg>
        ),
        color: '#2496ED'
    },
    git: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032" />
            </svg>
        ),
        color: '#F05032'
    },
    aws: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.407l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" fill="#FF9900" />
            </svg>
        ),
        color: '#FF9900'
    },
    vercel: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
            </svg>
        ),
        color: '#000000'
    },
    render: {
        component: () => (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#46E3B7" />
                <circle cx="12" cy="12" r="5" fill="#46E3B7" />
            </svg>
        ),
        color: '#46E3B7'
    }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
    const IconComponent = iconComponents[type]?.component;
    return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for All Resume Technologies ---
const skillsConfig: SkillConfig[] = [
    // Inner Orbit - Languages
    { id: 'java', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'java', phaseShift: 0, glowColor: 'yellow', label: 'Java' },
    { id: 'python', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'python', phaseShift: Math.PI / 3, glowColor: 'yellow', label: 'Python' },
    { id: 'typescript', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'typescript', phaseShift: (2 * Math.PI) / 3, glowColor: 'yellow', label: 'TypeScript' },
    { id: 'javascript', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'javascript', phaseShift: Math.PI, glowColor: 'yellow', label: 'JavaScript' },
    { id: 'c', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'c', phaseShift: (4 * Math.PI) / 3, glowColor: 'yellow', label: 'C/C++' },
    { id: 'sql', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'sql', phaseShift: (5 * Math.PI) / 3, glowColor: 'yellow', label: 'SQL' },

    // Middle Orbit - Frameworks
    { id: 'spring', orbitRadius: 150, size: 42, speed: -0.5, iconType: 'spring', phaseShift: 0, glowColor: 'green', label: 'Spring Boot' },
    { id: 'react', orbitRadius: 150, size: 42, speed: -0.5, iconType: 'react', phaseShift: Math.PI / 3, glowColor: 'cyan', label: 'React' },
    { id: 'nextjs', orbitRadius: 150, size: 40, speed: -0.5, iconType: 'nextjs', phaseShift: (2 * Math.PI) / 3, glowColor: 'purple', label: 'Next.js' },
    { id: 'fastapi', orbitRadius: 150, size: 40, speed: -0.5, iconType: 'fastapi', phaseShift: Math.PI, glowColor: 'green', label: 'FastAPI' },
    { id: 'nodejs', orbitRadius: 150, size: 40, speed: -0.5, iconType: 'nodejs', phaseShift: (4 * Math.PI) / 3, glowColor: 'green', label: 'Node.js' },
    { id: 'html', orbitRadius: 150, size: 36, speed: -0.5, iconType: 'html', phaseShift: (5 * Math.PI) / 3, glowColor: 'yellow', label: 'HTML5' },

    // Outer Orbit - Databases & Tools
    { id: 'postgres', orbitRadius: 210, size: 40, speed: 0.35, iconType: 'postgres', phaseShift: 0, glowColor: 'cyan', label: 'PostgreSQL' },
    { id: 'redis', orbitRadius: 210, size: 38, speed: 0.35, iconType: 'redis', phaseShift: Math.PI / 4, glowColor: 'purple', label: 'Redis' },
    { id: 'supabase', orbitRadius: 210, size: 38, speed: 0.35, iconType: 'supabase', phaseShift: Math.PI / 2, glowColor: 'green', label: 'Supabase' },
    { id: 'docker', orbitRadius: 210, size: 40, speed: 0.35, iconType: 'docker', phaseShift: (3 * Math.PI) / 4, glowColor: 'cyan', label: 'Docker' },
    { id: 'git', orbitRadius: 210, size: 38, speed: 0.35, iconType: 'git', phaseShift: Math.PI, glowColor: 'yellow', label: 'Git' },
    { id: 'aws', orbitRadius: 210, size: 38, speed: 0.35, iconType: 'aws', phaseShift: (5 * Math.PI) / 4, glowColor: 'yellow', label: 'AWS' },
    { id: 'vercel', orbitRadius: 210, size: 36, speed: 0.35, iconType: 'vercel', phaseShift: (3 * Math.PI) / 2, glowColor: 'purple', label: 'Vercel' },
    { id: 'render', orbitRadius: 210, size: 36, speed: 0.35, iconType: 'render', phaseShift: (7 * Math.PI) / 4, glowColor: 'green', label: 'Render' },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { orbitRadius, size, iconType, label } = config;

    // Calculate position on orbit
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;

    // Use left/top positioning instead of calc() in transform
    // Safari doesn't support calc() inside translate3d()
    const halfSize = size / 2;

    return (
        <div
            className="orbiting-skill-item"
            style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                // Position from center of container, offset by half the icon size
                left: '50%',
                top: '50%',
                marginLeft: `${x - halfSize}px`,
                marginTop: `${y - halfSize}px`,
                zIndex: isHovered ? 20 : 10,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`
          relative w-full h-full p-2 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
                style={{
                    background: 'var(--card-background)',
                    border: '1px solid var(--card-border)',
                    boxShadow: isHovered
                        ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
                        : undefined
                }}
            >
                <SkillIcon type={iconType} />
                {isHovered && (
                    <div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
                        style={{
                            background: 'var(--foreground)',
                            color: 'var(--background)',
                        }}
                    >
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
    const glowColors = {
        cyan: { primary: 'rgba(6, 182, 212, 0.3)', secondary: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.2)' },
        purple: { primary: 'rgba(147, 51, 234, 0.3)', secondary: 'rgba(147, 51, 234, 0.15)', border: 'rgba(147, 51, 234, 0.2)' },
        green: { primary: 'rgba(34, 197, 94, 0.3)', secondary: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.2)' },
        yellow: { primary: 'rgba(234, 179, 8, 0.3)', secondary: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.2)' },
    };

    const colors = glowColors[glowColor] || glowColors.cyan;

    return (
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                animationDelay: `${animationDelay}s`,
            }}
        >
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    border: `1px solid ${colors.border}`,
                    boxShadow: `inset 0 0 20px ${colors.secondary}`,
                }}
            />
        </div>
    );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main Component ---
export default function OrbitingSkills() {
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering on client
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isPaused || !mounted) return;

        let animationFrameId: number;
        let lastTime = performance.now();

        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            setTime(prevTime => prevTime + deltaTime);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, mounted]);

    const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
        { radius: 90, glowColor: 'yellow', delay: 0 },
        { radius: 150, glowColor: 'cyan', delay: 0.5 },
        { radius: 210, glowColor: 'purple', delay: 1 }
    ];

    // Show loading placeholder during SSR
    if (!mounted) {
        return (
            <div className="orbiting-skills-container">
                <h3 className="orbiting-skills-title">My Tech Stack</h3>
                <div className="orbiting-skills-orbit" style={{ minHeight: '500px' }} />
            </div>
        );
    }

    return (
        <div className="orbiting-skills-container">
            <h3 className="orbiting-skills-title">My Tech Stack</h3>

            <div
                className="orbiting-skills-orbit"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Central Icon */}
                <div className="orbiting-skills-center">
                    <div className="orbiting-skills-center-glow"></div>
                    <div className="orbiting-skills-center-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                    </div>
                </div>

                {/* Render orbit paths */}
                {orbitConfigs.map((config) => (
                    <GlowingOrbitPath
                        key={`path-${config.radius}`}
                        radius={config.radius}
                        glowColor={config.glowColor}
                        animationDelay={config.delay}
                    />
                ))}

                {/* Render skill icons */}
                {skillsConfig.map((config) => {
                    const angle = time * config.speed + (config.phaseShift || 0);
                    return (
                        <OrbitingSkill
                            key={config.id}
                            config={config}
                            angle={angle}
                        />
                    );
                })}
            </div>

            {/* Legend */}
            <div className="orbiting-skills-legend">
                <span className="orbiting-skills-legend-item">
                    <span className="orbiting-skills-legend-dot" style={{ background: '#eab308' }} />
                    Languages
                </span>
                <span className="orbiting-skills-legend-item">
                    <span className="orbiting-skills-legend-dot" style={{ background: '#06b6d4' }} />
                    Frameworks
                </span>
                <span className="orbiting-skills-legend-item">
                    <span className="orbiting-skills-legend-dot" style={{ background: '#9333ea' }} />
                    Tools & DBs
                </span>
            </div>
        </div>
    );
}
