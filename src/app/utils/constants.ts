import guyImg from '../../assets/guy.gif';
import { IEmployeeState } from '../slices/employee';

export enum ROLES {
	DEVELOPER = 'Developer',
	DESIGNER = 'Graphic designer',
	TESTER = 'Tester',
	SCRUM_MASTER = 'Scrum master',
	MARKETER = 'Marketer',
	PRODUCTION_MANAGER = 'Production manager',
}

export enum FORMAT_SUFFIXES {
	THOUSAND = 'K',
	MILLION = 'M',
	BILLION = 'B',
	TRILLION = 'T',
	QUADRILLION = 'Qa',
	QUINTILLION = 'Qt',
	SEXTILLION = 'Sx',
	SEPTILLION = 'Sp',
	OCTILLION = 'Oc',
	NONILLION = 'No',
}

export enum BONUS_EVENTS {
	STATICGOLD = 'STATICGOLD',
	CPSX10 = 'New sponsorship',
	CPSX20 = 'New award earned',
}

export enum SLICE_NAMES {
	GOLD = 'gold',
	TIMER = 'timer',
	EMPLOYEES = 'employees',
	HUD = 'hud',
}

interface ICharacterConfig {
	image: string;
	position: string;
}
type characterImgType = Record<string, ICharacterConfig>;
const CHARACTER_CONFIG: characterImgType = {
	[ROLES.DEVELOPER]: {
		image: guyImg,
		position: 'top-2/3 -translate-y-2/3 left-3/4 -translate-x-3/4 z-20',
	},
	[ROLES.DESIGNER]: {
		image: guyImg,
		position: 'top-3/4 -translate-y-3/4 left-1/4 -translate-x-3/4 z-20',
	},
	[ROLES.TESTER]: {
		image: guyImg,
		position: 'top-1/2 -translate-y-1/2 right-0 -translate-x-1/2 z-10',
	},
	[ROLES.MARKETER]: {
		image: guyImg,
		position: 'top-1/4 -translate-y-1/4 left-1/2 -translate-x-3/4 z-10',
	},
	[ROLES.SCRUM_MASTER]: {
		image: guyImg,
		position: 'top-2/4 -translate-y-1/2 left-1/4 -translate-x-1/2 z-10',
	},
	[ROLES.PRODUCTION_MANAGER]: {
		image: guyImg,
		position: 'top-1/2 translate-y-3/4 right-1/3 translate-x-1/4 z-30',
	},
};
const EMPLOYEES_CONFIG: Array<IEmployeeState> = [
	{
		name: ROLES.DEVELOPER,
		quantity: 0,
		profit: 1,
		cost: 1,
	},
	{
		name: ROLES.DESIGNER,
		quantity: 0,
		profit: 5,
		cost: 5000,
	},
	{
		name: ROLES.TESTER,
		quantity: 0,
		profit: 10,
		cost: 80000,
	},
	{
		name: ROLES.SCRUM_MASTER,
		quantity: 0,
		profit: 15,
		cost: 200000,
	},
	{
		name: ROLES.MARKETER,
		quantity: 0,
		profit: 20,
		cost: 600000,
	},
	{
		name: ROLES.PRODUCTION_MANAGER,
		quantity: 0,
		profit: 25,
		cost: 1000000,
	},
];

export const CONSTANTS = {
	EMPLOYEE_INCREASE_VALUE: 1,
	GOLD_INITIAL_VALUE: 1,
	GOLD_INITIAL_MULTIPLIER: 0,
	GAME_STATE_NAME: 'IdleEmployees',
	HUD_NO_ENOUGH_MONEY: "You don't have enough money",
	COST_INCREASE_RATE: 1.1,
	PERSISTENCY_TRIGGER_TIMER: 1500,
	BONUS_TRIGGER_TIMER: 20000,
	GOLD_RENEWAL_TIMER: 50,
	GOLD_PER_SECOND: 1,
	CHARACTER_CONFIG,
	EMPLOYEES_CONFIG,
};
