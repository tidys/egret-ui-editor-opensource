import { InnerBtnWindow } from 'egret/platform/innerwindow/browser/innerWindow';
import { IDisposable, dispose } from 'egret/base/common/lifecycle';
import { InnerButtonType } from 'egret/platform/innerwindow/common/innerWindows';
import { ToggleButton, ToggleIconButton, IconButton, SystemButton } from 'egret/base/browser/ui/buttons';
import { Tabbar } from 'egret/base/browser/ui/tabbars';
import { Label } from 'egret/base/browser/ui/labels';
import { AccordionGroup, DataSource } from 'egret/base/browser/ui/accordionGroup';
import { HGroup } from 'egret/base/browser/ui/containers';
import { TextInput, NumberInput } from 'egret/base/browser/ui/inputs';

import './media/customWindow.css';

/**
 * 自定义测试窗体
 */
export class SampleWindow extends InnerBtnWindow {
	constructor() {
		super();
		this.title = '自定义窗体';
		this.titleBarVisible = false;
		// this.backgroundColor = '#232c33';
		this.initButtons({ label: '知道了' });
		this.registerListeners();
	}

	private disposables: IDisposable[] = [];
	private registerListeners(): void {
		const dispose = this.onButtonClick(e => this.btnClick_handler(e));
		this.disposables.push(dispose);
	}

	private btnClick_handler(button: InnerButtonType): void {
		console.log('点击了按钮');
	}
	/**
	 * 重载父类的render方法，进行内容渲染
	 * @param contentGroup 
	 */
	public render(contentGroup: HTMLElement): void {
		super.render(contentGroup);
		contentGroup.style.padding = '10px';

		const attContainer = document.createElement('div');
		attContainer.style.height = '30px';
		attContainer.style.display = 'flex';
		attContainer.style.alignItems = 'center';

		let group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'System Button:';
		label.paddingHorizontal = 6;
		var systemButton = new SystemButton(group);
		systemButton.label = '按钮';


		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'System Button Default:';
		label.paddingHorizontal = 6;
		var systemButton = new SystemButton(group);
		systemButton.isDefault = true;
		systemButton.label = '按钮';

		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'Icon Button:';
		label.paddingHorizontal = 6;
		let clickIndex: number = 0;
		const iconButton = new IconButton(group);
		iconButton.onClick((b) => {
			clickIndex++;
			console.log('点击次数', clickIndex);

		});
		iconButton.iconClass = 'test-icon-button';

		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'Toggle Icon Button:';
		label.paddingHorizontal = 6;
		const toggleIconButton = new ToggleIconButton(group);
		toggleIconButton.iconClass = 'test-icon-button';

		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'Toggle Button:';
		label.paddingHorizontal = 6;
		const toggleButton = new ToggleButton(group);
		toggleButton.iconClass = 'test-icon-button';
		toggleButton.label = '切换按钮';

		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'abbar:';
		label.paddingHorizontal = 6;
		const tabbar = new Tabbar(group);
		tabbar.dataProvider = [
			{
				iconClass: 'test-icon1',
				label: '标签1',
				id: 'label1'
			},
			{
				iconClass: 'test-icon2',
				label: '标签2',
				id: 'label2'
			},
			{
				iconClass: 'test-icon3',
				label: '标签3',
				id: 'label3'
			}
		];



		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'Text Input:';
		label.paddingHorizontal = 6;
		const textInput = new TextInput(group);
		textInput.prompt = '这里输入内容';


		group = new HGroup(contentGroup);
		var label = new Label(group);
		label.text = 'Number Input:';
		label.paddingHorizontal = 6;
		const numberInput = new NumberInput(group);
		numberInput.prompt = '输入数值';
		numberInput.onValueChanging(text => {
			console.log('changing', text);
		});
		numberInput.onValueChanged(text => {
			console.log('changed', text);
		});

		const accordionGroup = new AccordionGroup(contentGroup);
		const accordionDataProvider: DataSource[] = [];
		const content1 = document.createElement('div');
		content1.style.background = '#ff0000';
		content1.style.width = '100px';
		content1.style.height = '200px';

		const content2 = document.createElement('div');
		content2.style.background = '#00ff00';
		content2.style.width = '200px';
		content2.style.height = '200px';

		const content3 = document.createElement('div');
		content3.style.background = '#0000ff';
		content3.style.width = '200px';
		content3.style.height = '100px';
		accordionDataProvider.push(
			{
				label: '测试面板1',
				id: 'test1',
				content: content1
			},
			{
				label: '测试面板2',
				id: 'test2',
				content: content2
			},
			{
				label: '测试面板3',
				id: 'test3',
				content: content3
			},
		);
		accordionGroup.dataProvider = accordionDataProvider;
		// let splitView = new SplitView(contentGroup);
	}
	/**
	 * 释放
	 */
	public dispose() {
		super.dispose();
		dispose(this.disposables);
	}
}