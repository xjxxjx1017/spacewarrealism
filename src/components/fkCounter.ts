
export class FkCounter {
	private dataCount : number = 0;
	private triggerAfterNum : number = -1;
	private triggerAfterCallback = null;

	constructor() {}
	
	public AddCount() : void {
		this.dataCount ++;
		this.Check();
	}

	public ResetCount() {
		this.dataCount = 0;
	}

	public InitTriggerAfter( _num : number, _f ) : void {
		this.triggerAfterNum = _num;
		this.triggerAfterCallback = _f;
	}

	private Check() : void {
		if ( this.triggerAfterCallback != null && this.triggerAfterNum > -1 ) {
			if ( this.dataCount >= this.triggerAfterNum ) {
				var f = this.triggerAfterCallback;
				this.triggerAfterCallback = null;
				this.triggerAfterNum = -1;
				f();
			}
		}
	}
}