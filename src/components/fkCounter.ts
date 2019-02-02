
export class FkCounter {
	private count : number = 0;
	private triggerAfterNum : number = -1;
	private triggerAfterCallback = null;

	constructor() {}
	public AddCount() : void {
		this.count ++;
		this.Check();
	}

	public ResetCount() {
		this.count = 0;
	}

	public InitTriggerAfter( num : number, f ) : void {
		this.triggerAfterNum = num;
		this.triggerAfterCallback = f;
	}

	private Check() : void {
		if ( this.triggerAfterCallback != null && this.triggerAfterNum > -1 ) {
			if ( this.count >= this.triggerAfterNum ) {
				var f = this.triggerAfterCallback;
				this.triggerAfterCallback = null;
				this.triggerAfterNum = -1;
				f();
			}
		}
	}
}