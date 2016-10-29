#import "WazeLink.h"

@implementation WazeLink

- (void) execute:(CDVInvokedUrlCommand*)command   {
    NSString* url = [command.arguments objectAtIndex:0];
    if ([[UIApplication sharedApplication]
         canOpenURL:[NSURL URLWithString:@"waze://"]]) {
        
        // Waze is installed. Launch Waze and start navigation
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
        
    } else {
        
        // Waze is not installed. Launch AppStore to install Waze app
        [[UIApplication sharedApplication] openURL:[NSURL
                                                    URLWithString:@"http://itunes.apple.com/us/app/id323229106"]];
    }
}

@end
